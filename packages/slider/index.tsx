import {EventType as K, SpecificEventListener} from '@material/base/types';
import {MDCSliderAdapter, MDCSliderFoundation} from '@material/slider';
import {cssClasses, numbers} from '@material/slider/constants';
import classnames from 'classnames';
import React from 'react';

const KEY_IDS = {
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  ARROW_UP: 'ArrowUp',
  END: 'End',
  HOME: 'Home',
  PAGE_DOWN: 'PageDown',
  PAGE_UP: 'PageUp',
};

type UpEventType = 'mouseup' | 'pointerup' | 'touchend';
type DownEventType = 'mousedown' | 'pointerdown' | 'touchstart';
type MoveEventType = 'mousemove' | 'pointermove' | 'touchmove';
type MouseLikeEvent = MouseEvent | PointerEvent | TouchEvent;
type ReactMouseLikeEvent =
  | React.MouseEvent
  | React.PointerEvent
  | React.TouchEvent;

type MoveEventMap = {readonly [K in DownEventType]: MoveEventType};

const UP_EVENTS: UpEventType[] = ['mouseup', 'pointerup', 'touchend'];

const MOVE_EVENT_MAP: MoveEventMap = {
  mousedown: 'mousemove',
  pointerdown: 'pointermove',
  touchstart: 'touchmove',
};

export interface SliderProps extends React.HTMLProps<HTMLDivElement> {
  value: number;
  discrete?: boolean;
  displayMarkers?: boolean;
  min: number;
  max: number;
  step?: number;
  disabled?: boolean;
  className?: string;
  tabIndex?: number;
  isRtl?: boolean;
  onValueChange?: (value: number) => void;
  onValueInput?: (value: number) => void;
}

interface SliderState {
  classList: Set<string>;
  markerValue?: number;
  markerStyles: React.CSSProperties[];
}

class Slider extends React.Component<SliderProps, SliderState> {
  get classes() {
    const {classList} = this.state;
    const {className, discrete, displayMarkers} = this.props;
    return classnames('mdc-slider', Array.from(classList), className, {
      'mdc-slider--discrete': discrete,
      'mdc-slider--display-markers': discrete && displayMarkers,
    });
  }

  get adapter(): MDCSliderAdapter {
    return {
      hasClass: (className: string): boolean =>
        this.classes.split(' ').includes(className),
      addClass: (className: string): void => {
        const {classList} = this.state;
        classList.add(className);
        this.setState({classList});
      },
      removeClass: (className: string): void => {
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
      setAttribute: (name: string, value: string): void => {
        if (!this.sliderElement.current) {
          return;
        }
        this.sliderElement.current.setAttribute(name, value);
      },
      removeAttribute: (name: string): void => {
        if (!this.sliderElement.current) {
          return;
        }
        this.sliderElement.current.removeAttribute(name);
      },
      computeBoundingRect: (): ClientRect | DOMRect => {
        // new DOMRect is not IE11 compatible
        this.rect = !this.sliderElement.current
          ? {
              bottom: 0,
              height: 0,
              left: 0,
              right: 0,
              top: 0,
              width: 0,
              x: 0,
              y: 0,
            }
          : this.sliderElement.current.getBoundingClientRect();

        return this.rect;
      },
      getTabIndex: (): number => this.props.tabIndex || 0,
      // React handles events differently:
      registerInteractionHandler: () => undefined,
      deregisterInteractionHandler: () => undefined,
      registerThumbContainerInteractionHandler: () => undefined,
      deregisterThumbContainerInteractionHandler: () => undefined,
      registerBodyInteractionHandler: (
        evtType: K,
        handler: SpecificEventListener<K>
      ): void => {
        document.body.addEventListener(evtType, handler);
      },
      deregisterBodyInteractionHandler: (
        evtType: K,
        handler: SpecificEventListener<K>
      ): void => {
        document.body.removeEventListener(evtType, handler);
      },
      registerResizeHandler: (
        handler: SpecificEventListener<'resize'>
      ): void => {
        window.addEventListener('resize', handler);
      },
      deregisterResizeHandler: (
        handler: SpecificEventListener<'resize'>
      ): void => {
        window.removeEventListener('resize', handler);
      },
      notifyInput: (): void => {
        const callback = this.props.onValueInput;
        if (typeof callback === 'function') {
          callback(this.foundation.getValue());
        }
      },
      notifyChange: (): void => {
        const callback = this.props.onValueChange;
        if (typeof callback === 'function') {
          callback(this.foundation.getValue());
        }
      },
      setThumbContainerStyleProperty: (
        propertyName: string,
        value: string
      ): void => {
        this.setStylePropertyOn(
          this.thumbContainerElement.current,
          propertyName,
          value
        );
      },
      setTrackStyleProperty: (propertyName: string, value: string): void => {
        this.setStylePropertyOn(this.trackElement.current, propertyName, value);
      },
      setMarkerValue: (value: number): void =>
        this.setState({markerValue: value}),
      appendTrackMarkers: (numMarkers: number): void => {
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
      removeTrackMarkers: (): void => {
        this.setState({markerStyles: []});
      },
      setLastTrackMarkersStyleProperty: (
        propertyName: string,
        value: string
      ): void => {
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
      isRTL: (): boolean => this.props.isRtl || false,
    };
  }

  private preventFocusState = false;
  private active = false;
  private inTransit = false;
  private handlingThumbTargetEvt = false;
  private rect!: ClientRect | DOMRect; // assigned in foundation.layout()

  static defaultProps: Partial<SliderProps> = {
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
  };
  foundation!: MDCSliderFoundation;
  sliderElement: React.RefObject<HTMLDivElement> = React.createRef();
  trackElement: React.RefObject<HTMLDivElement> = React.createRef();
  thumbContainerElement: React.RefObject<HTMLDivElement> = React.createRef();

  state: SliderState = {
    classList: new Set(),
    markerStyles: [],
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

  onThumbEnd?: () => void;

  /**
   * Sets the value of the slider
   */
  private setValue(value: number, shouldFireInput: boolean) {
    const {discrete} = this.props;
    this.foundation.setValue(value);

    if (this.inTransit) {
      this.onThumbEnd = () => {
        this.setInTransit(false);
        this.onThumbEnd = undefined;
      };
    }

    if (shouldFireInput) {
      this.adapter.notifyInput();
      if (discrete) {
        this.adapter.setMarkerValue(value);
      }
    }
  }

  /**
   * Toggles the active state of the slider
   */
  private setActive(active: boolean) {
    this.active = active;
    this.toggleClass(cssClasses.ACTIVE, this.active);
  }

  /**
   * Toggles the inTransit state of the slider
   */
  private setInTransit(inTransit: boolean) {
    this.inTransit = inTransit;
    this.toggleClass(cssClasses.IN_TRANSIT, this.inTransit);
  }

  /**
   * Conditionally adds or removes a class based on shouldBePresent
   */
  private toggleClass(className: string, shouldBePresent: boolean) {
    if (shouldBePresent) {
      this.adapter.addClass(className);
    } else {
      this.adapter.removeClass(className);
    }
  }

  /**
   * Called when the user starts interacting with the slider
   */
  onDown = (downEvent: ReactMouseLikeEvent) => {
    const {disabled} = this.props;
    if (disabled) {
      return;
    }

    this.preventFocusState = true;
    this.setInTransit(!this.handlingThumbTargetEvt);
    this.handlingThumbTargetEvt = false;
    this.setActive(true);

    const moveHandler = (moveEvent: MouseLikeEvent) => {
      this.handleMove(moveEvent);
    };

    const moveEventType = MOVE_EVENT_MAP[downEvent.type as DownEventType];

    // Note: upHandler is [de]registered on ALL potential pointer-related release event types, since some browsers
    // do not always fire these consistently in pairs.
    // (See https://github.com/material-components/material-components-web/issues/1192)
    const upHandler = () => {
      this.handleUp();
      this.adapter.deregisterBodyInteractionHandler(moveEventType, moveHandler);
      UP_EVENTS.forEach((evtName) =>
        this.adapter.deregisterBodyInteractionHandler(evtName, upHandler)
      );
    };

    this.adapter.registerBodyInteractionHandler(moveEventType, moveHandler);
    UP_EVENTS.forEach((evtName) =>
      this.adapter.registerBodyInteractionHandler(evtName, upHandler)
    );
    this.setValueFromEvt(downEvent);
  };

  /**
   * Called when the user's interaction with the slider ends
   */
  private handleUp() {
    this.setActive(false);
    this.adapter.notifyChange();
  }

  /**
   * Called when the user moves the slider
   */
  private handleMove(evt: MouseLikeEvent) {
    evt.preventDefault();
    this.setValueFromEvt(evt);
  }

  /**
   * Returns the pageX of the event
   */
  private getPageX(evt: MouseLikeEvent | ReactMouseLikeEvent): number {
    if (
      (evt as TouchEvent).targetTouches &&
      (evt as TouchEvent).targetTouches.length > 0
    ) {
      return (evt as TouchEvent).targetTouches[0].pageX;
    }
    return (evt as MouseEvent).pageX;
  }

  /**
   * Sets the slider value from an event
   */
  private setValueFromEvt(evt: MouseLikeEvent | ReactMouseLikeEvent) {
    const pageX = this.getPageX(evt);
    const value = this.computeValueFromPageX(pageX);
    this.setValue(value, true);
  }

  /**
   * Computes the new value from the pageX position
   */
  private computeValueFromPageX(pageX: number): number {
    const {max, min} = this.props;
    const xPos = pageX - this.rect.left;
    let pctComplete = xPos / this.rect.width;
    if (this.adapter.isRTL()) {
      pctComplete = 1 - pctComplete;
    }
    // Fit the percentage complete between the range [min,max]
    // by remapping from [0, 1] to [min, min+(max-min)].
    return min + pctComplete * (max - min);
  }

  /**
   * Handles keydown events
   */
  onKeyDown = (evt: React.KeyboardEvent) => {
    const keyId = this.getKeyId(evt);
    const value = this.getValueForKeyId(keyId);
    if (isNaN(value)) {
      return;
    }

    // Prevent page from scrolling due to key presses that would normally scroll the page
    evt.preventDefault();
    this.adapter.addClass(cssClasses.FOCUS);
    this.setValue(value, true);
    this.adapter.notifyChange();
  };

  /**
   * Returns the computed name of the event
   */
  private getKeyId(kbdEvt: React.KeyboardEvent): string {
    if (kbdEvt.key === KEY_IDS.ARROW_LEFT || kbdEvt.keyCode === 37) {
      return KEY_IDS.ARROW_LEFT;
    }
    if (kbdEvt.key === KEY_IDS.ARROW_RIGHT || kbdEvt.keyCode === 39) {
      return KEY_IDS.ARROW_RIGHT;
    }
    if (kbdEvt.key === KEY_IDS.ARROW_UP || kbdEvt.keyCode === 38) {
      return KEY_IDS.ARROW_UP;
    }
    if (kbdEvt.key === KEY_IDS.ARROW_DOWN || kbdEvt.keyCode === 40) {
      return KEY_IDS.ARROW_DOWN;
    }
    if (kbdEvt.key === KEY_IDS.HOME || kbdEvt.keyCode === 36) {
      return KEY_IDS.HOME;
    }
    if (kbdEvt.key === KEY_IDS.END || kbdEvt.keyCode === 35) {
      return KEY_IDS.END;
    }
    if (kbdEvt.key === KEY_IDS.PAGE_UP || kbdEvt.keyCode === 33) {
      return KEY_IDS.PAGE_UP;
    }
    if (kbdEvt.key === KEY_IDS.PAGE_DOWN || kbdEvt.keyCode === 34) {
      return KEY_IDS.PAGE_DOWN;
    }
    return '';
  }

  /**
   * Computes the value given a keyboard key ID
   */
  private getValueForKeyId(keyId: string): number {
    const {max, min, step} = this.props;
    let delta = step || (max - min) / 100;
    const valueNeedsToBeFlipped =
      this.adapter.isRTL() &&
      (keyId === KEY_IDS.ARROW_LEFT || keyId === KEY_IDS.ARROW_RIGHT);
    if (valueNeedsToBeFlipped) {
      delta = -delta;
    }

    switch (keyId) {
      case KEY_IDS.ARROW_LEFT:
      case KEY_IDS.ARROW_DOWN:
        return this.foundation.getValue() - delta;
      case KEY_IDS.ARROW_RIGHT:
      case KEY_IDS.ARROW_UP:
        return this.foundation.getValue() + delta;
      case KEY_IDS.HOME:
        return min;
      case KEY_IDS.END:
        return max;
      case KEY_IDS.PAGE_UP:
        return this.foundation.getValue() + delta * numbers.PAGE_FACTOR;
      case KEY_IDS.PAGE_DOWN:
        return this.foundation.getValue() - delta * numbers.PAGE_FACTOR;
      default:
        return NaN;
    }
  }

  onFocus = () => {
    if (this.preventFocusState) {
      return;
    }
    this.adapter.addClass(cssClasses.FOCUS);
  };

  onBlur = () => {
    this.preventFocusState = false;
    this.adapter.removeClass(cssClasses.FOCUS);
  };

  onThumbDown = () => (this.handlingThumbTargetEvt = true);

  render() {
    const {
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
    const {markerValue, markerStyles} = this.state;

    return (
      <div
        className={this.classes}
        role='slider'
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        data-step={step}
        aria-label='Select Value'
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
          <div className='mdc-slider__track' ref={this.trackElement} />
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
          ref={this.thumbContainerElement}
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

  private setStylePropertyOn(
    element: HTMLElement | null,
    propertyName: string,
    value: string
  ): void {
    // we need to cast prop from string (interface requirement) to CSSStyleDeclaration;
    const typedProp = propertyName as keyof CSSStyleDeclaration;
    // length and parentRule are readonly properties of CSSStyleDeclaration that
    // cannot be set
    if (!element || typedProp === 'length' || typedProp === 'parentRule') {
      return;
    }
    // https://github.com/Microsoft/TypeScript/issues/11914
    element.style[typedProp] = value;
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
  }
}

export default Slider;
