import {getCorrectEventName} from '@material/animation/util';
import {EventType, SpecificEventListener} from '@material/base/types';
import {
  MDCSliderAdapter,
  MDCSliderFoundation,
  cssClasses,
} from '@material/slider';
import classnames from 'classnames';
import React from 'react';

const convertDashToCamelCase = (propName: string) =>
  propName.replace(/-(\w)/g, (_, v) => v.toUpperCase());

type InteractionEvent =
  | React.MouseEvent
  | React.PointerEvent
  | React.TouchEvent;

export interface SliderProps extends React.HTMLProps<HTMLDivElement> {
  value: number;
  discrete: boolean;
  displayMarkers: boolean;
  min: number;
  max: number;
  step: number;
  disabled: boolean;
  ariaLabel: string;
  isRtl: boolean;
  onValueChange: (value: number) => void;
  onValueInput: (value: number) => void;
}

interface SliderState {
  classList: Set<string>;
  markerValue?: number;
  markerStyles: React.CSSProperties[];
  trackStyleProperty: React.CSSProperties;
  thumbContainerStyleProperty: React.CSSProperties;
}

type ElementStyleNames = 'trackStyleProperty' | 'thumbContainerStyleProperty';

class Slider extends React.Component<SliderProps, SliderState> {
  foundation!: MDCSliderFoundation;
  sliderElement: React.RefObject<HTMLDivElement> = React.createRef();

  static defaultProps: Partial<SliderProps> = {
    ariaLabel: 'Select Value',
    className: '',
    open: false,
    min: 0,
    max: 100,
    value: 0,
    step: 0,
    discrete: false,
    displayMarkers: false,
    disabled: false,
    tabIndex: 0,
    isRtl: false,
    onValueChange: () => {},
    onValueInput: () => {},
  };

  state: SliderState = {
    classList: new Set(),
    markerStyles: [],
    trackStyleProperty: {},
    thumbContainerStyleProperty: {},
  };

  get classes() {
    const {classList} = this.state;
    const {className, discrete, displayMarkers} = this.props;
    return classnames('mdc-slider', Array.from(classList), className, {
      [cssClasses.DISCRETE]: discrete,
      [cssClasses.HAS_TRACK_MARKER]: discrete && displayMarkers,
    });
  }

  get adapter(): MDCSliderAdapter {
    return {
      hasClass: (className: string): boolean =>
        this.classes.split(' ').includes(className),
      addClass: (className: string) => {
        const {classList} = this.state;
        classList.add(className);
        this.setState({classList});
      },
      removeClass: (className: string) => {
        const {classList} = this.state;
        classList.delete(className);
        this.setState({classList});
      },
      getAttribute: (name: string): string | null => {
        if (!this.sliderElement.current) {
          return null;
        }
        return this.sliderElement.current.getAttribute(name);
      },
      setAttribute: (name: string, value: string) => {
        if (!this.sliderElement.current) {
          return;
        }
        this.sliderElement.current.setAttribute(name, value);
      },
      removeAttribute: (name: string) => {
        if (!this.sliderElement.current) {
          return;
        }
        this.sliderElement.current.removeAttribute(name);
      },
      computeBoundingRect: (): ClientRect | DOMRect => {
        if (!this.sliderElement.current) {
          // new DOMRect is not IE11 compatible
          const defaultDOMRect = {
            bottom: 0,
            height: 0,
            left: 0,
            right: 0,
            top: 0,
            width: 0,
            x: 0,
            y: 0,
          };
          return defaultDOMRect;
        }
        return this.sliderElement.current.getBoundingClientRect();
      },
      getTabIndex: (): number => this.props.tabIndex!,
      // React handles events differently:
      registerInteractionHandler: () => undefined,
      deregisterInteractionHandler: () => undefined,
      registerThumbContainerInteractionHandler: (
        evtType: EventType,
        handler: SpecificEventListener<EventType>
      ) => {
        if (evtType === this.transitionendEvtName) {
          this.onThumbEnd = handler as () => void;
        }
      },
      deregisterThumbContainerInteractionHandler: (evtType: EventType) => {
        if (evtType === this.transitionendEvtName) {
          this.onThumbEnd = undefined;
        }
      },
      registerBodyInteractionHandler: (
        evtType: EventType,
        handler: SpecificEventListener<EventType>
      ) => {
        document.body.addEventListener(evtType, handler);
      },
      deregisterBodyInteractionHandler: (
        evtType: EventType,
        handler: SpecificEventListener<EventType>
      ) => {
        document.body.removeEventListener(evtType, handler);
      },
      registerResizeHandler: (handler: SpecificEventListener<'resize'>) => {
        window.addEventListener('resize', handler);
      },
      deregisterResizeHandler: (handler: SpecificEventListener<'resize'>) => {
        window.removeEventListener('resize', handler);
      },
      notifyInput: () => {
        const callback = this.props.onValueInput;
        if (typeof callback === 'function') {
          callback(this.foundation.getValue());
        }
      },
      notifyChange: () => {
        const callback = this.props.onValueChange;
        if (typeof callback === 'function') {
          callback(this.foundation.getValue());
        }
      },
      setThumbContainerStyleProperty: (prop: string, value: string) =>
        this.setStyleToElement(prop, value, 'thumbContainerStyleProperty'),
      setTrackStyleProperty: (prop: string, value: string) =>
        this.setStyleToElement(prop, value, 'trackStyleProperty'),
      setMarkerValue: (value: number) => this.setState({markerValue: value}),
      appendTrackMarkers: (numMarkers: number) => {
        this.setState((prevState) => {
          let {markerStyles} = prevState;
          // Shallow copy of array:
          markerStyles = markerStyles.slice();
          for (let i = 0; i < numMarkers; i++) {
            markerStyles.push({});
          }
          return {markerStyles};
        });
      },
      removeTrackMarkers: () => {
        this.setState({markerStyles: []});
      },
      setLastTrackMarkersStyleProperty: (
        propertyName: string,
        value: string
      ) => {
        this.setState((prevState) => {
          let {markerStyles} = prevState;
          const last = markerStyles.length - 1;
          markerStyles = markerStyles.slice();
          const clone = Object.assign({}, markerStyles[last]);
          // we need to cast prop from string (interface requirement) to React.CSSProperties;
          const typedProp = propertyName as keyof React.CSSProperties;
          // https://github.com/Microsoft/TypeScript/issues/11914
          clone[typedProp] = value;
          markerStyles[last] = clone;
          return {markerStyles};
        });
      },
      isRTL: (): boolean => this.props.isRtl,
    };
  }

  onDown?: (downEvent: InteractionEvent) => void;
  onThumbDown?: () => void;
  onThumbEnd?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: (evt: React.KeyboardEvent) => void;

  private transitionendEvtName =
    typeof window !== 'undefined'
      ? (getCorrectEventName(window, 'transitionend') as EventType)
      : 'transitionend';

  setStyleToElement = (
    prop: string,
    value: string | boolean,
    elementStyleProperty: ElementStyleNames
  ) => {
    const styleName = convertDashToCamelCase(prop);
    const updateElementStyleProperty = Object.assign(
      {},
      this.state[elementStyleProperty],
      {[styleName]: value}
    );
    this.setState((prevState) => {
      return Object.assign(prevState, {
        [elementStyleProperty]: updateElementStyleProperty,
      });
    });
  };

  componentDidMount() {
    this.initFoundation();
  }

  componentDidUpdate(prevProps: SliderProps) {
    const {step, value, min, max, disabled} = this.props;
    if (disabled !== prevProps.disabled) {
      this.foundation.setDisabled(disabled!);
    }
    if (step !== prevProps.step) {
      this.foundation.setStep(step!);
    }
    if (value !== prevProps.value) {
      this.foundation.setValue(value!);
    }
    if (min !== prevProps.min) {
      this.foundation.setMin(min!);
    }
    if (max !== prevProps.max) {
      this.foundation.setMax(max!);
    }
  }

  componentWillUnmount() {
    if (!this.foundation) {
      return;
    }
    this.foundation.destroy();
  }

  render() {
    const {
      ariaLabel,
      discrete,
      displayMarkers,
      value,
      min,
      max,
      step,
      disabled,
      /* eslint-disable @typescript-eslint/no-unused-vars */
      className,
      isRtl,
      onValueChange,
      onValueInput,
      /* eslint-enable @typescript-eslint/no-unused-vars */
      ...otherProps
    } = this.props;

    const {
      markerValue,
      markerStyles,
      trackStyleProperty,
      thumbContainerStyleProperty,
    } = this.state;

    return (
      <div
        className={this.classes}
        role='slider'
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        data-step={step}
        aria-label={ariaLabel}
        aria-disabled={disabled}
        ref={this.sliderElement}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        onMouseDown={this.onDown}
        onPointerDown={this.onDown}
        onTouchStart={this.onDown}
        onKeyDown={this.onKeyDown}
        {...otherProps as React.HTMLProps<HTMLDivElement>}
      >
        <div className='mdc-slider__track-container'>
          <div className='mdc-slider__track' style={trackStyleProperty} />
          {discrete && displayMarkers && (
            <div className='mdc-slider__track-marker-container'>
              {markerStyles.map((styles, index) => (
                <div
                  key={index}
                  className='mdc-slider__track-marker'
                  style={styles}
                />
              ))}
            </div>
          )}
        </div>
        <div
          className='mdc-slider__thumb-container'
          style={thumbContainerStyleProperty}
          onMouseDown={this.onThumbDown}
          onPointerDown={this.onThumbDown}
          onTouchStart={this.onThumbDown}
          onTransitionEnd={this.onThumbEnd}
        >
          {discrete && (
            <div className='mdc-slider__pin'>
              <span className='mdc-slider__pin-value-marker'>
                {markerValue}
              </span>
            </div>
          )}
          <svg className='mdc-slider__thumb' width='21' height='21'>
            <circle cx='10.5' cy='10.5' r='7.875' />
          </svg>
          <div className='mdc-slider__focus-ring' />
        </div>
      </div>
    );
  }

  private initFoundation() {
    if (this.foundation) {
      this.foundation.destroy();
    }
    this.foundation = new MDCSliderFoundation(this.adapter);
    this.foundation.init();

    const {step, value, min, max, disabled} = this.props;
    this.foundation.setDisabled(disabled!);
    this.foundation.setStep(step!);
    this.foundation.setValue(value!);
    this.foundation.setMin(min!);
    this.foundation.setMax(max!);
    this.foundation.layout();
    this.foundation.setupTrackMarker();

    this.onDown = (evt) => (this.foundation as any).handleDown_(evt);
    this.onThumbDown = (this.foundation as any).thumbContainerPointerHandler_;
    this.onFocus = () => (this.foundation as any).handleFocus_();
    this.onBlur = () => (this.foundation as any).handleBlur_();
    this.onKeyDown = (evt) => (this.foundation as any).handleKeydown_(evt);
  }
}

export default Slider;
