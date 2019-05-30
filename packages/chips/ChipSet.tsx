// The MIT License
//
// Copyright (c) 2018 Google, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
import React from 'react';
import {isElement} from 'react-is';
import classnames from 'classnames';
import {MDCChipSetFoundation} from '@material/chips/chip-set/foundation';
import ChipCheckmark from './ChipCheckmark';
import {ChipProps} from './Chip'; // eslint-disable-line @typescript-eslint/no-unused-vars

type ChipType = React.ReactElement<ChipProps>;

export interface ChipSetProps {
  className?: string;
  selectedChipIds?: string[];
  handleSelect?: (selectedChipIds: string[]) => void;
  updateChips?: (chips: Partial<ChipProps>[]) => void;
  choice?: boolean;
  filter?: boolean;
  input?: boolean;
  children: ChipType | ChipType[] | React.ReactNode;
}

interface ChipSetState {
  foundation: MDCChipSetFoundation | null;
  selectedChipIds: string[];
  hasInitialized: boolean;
}

export default class ChipSet extends React.Component<
  ChipSetProps,
  ChipSetState
> {
  checkmarkWidth = 0;
  constructor(props: ChipSetProps) {
    super(props);
    this.state = {
      selectedChipIds: props.selectedChipIds!,
      foundation: null,
      hasInitialized: false,
    };
  }

  static defaultProps: Partial<ChipSetProps> = {
    className: '',
    selectedChipIds: [],
    handleSelect: () => {},
    updateChips: () => {},
    choice: false,
    filter: false,
    input: false,
  };

  componentDidMount() {
    const foundation = new MDCChipSetFoundation(this.adapter);
    this.setState({foundation});
    foundation.init();
  }

  componentDidUpdate(prevProps: ChipSetProps, prevState: ChipSetState) {
    const {selectedChipIds} = this.props;
    if (this.state.foundation !== prevState.foundation) {
      this.initChipSelection();
    }
    if (selectedChipIds !== prevProps.selectedChipIds) {
      this.setState({selectedChipIds: selectedChipIds!});
    }
  }

  componentWillUnmount() {
    this.state.foundation && this.state.foundation.destroy();
  }

  get classes() {
    const {className, filter, choice, input} = this.props;
    return classnames('mdc-chip-set', className, {
      'mdc-chip-set--filter': filter,
      'mdc-chip-set--choice': choice,
      'mdc-chip-set--input': input,
    });
  }

  get adapter() {
    return {
      hasClass: (className: string) =>
        this.classes.split(' ').includes(className),
      setSelected: () => {
        const selectedChipIds = this.state
          .foundation!.getSelectedChipIds()
          .slice();
        this.setState({selectedChipIds}, () => {
          this.props.handleSelect!(selectedChipIds);
        });
      },
      removeChip: this.removeChip,
    };
  }

  initChipSelection() {
    React.Children.forEach(this.props.children, (child) => {
      if (!child || !isElement(child)) {
        return;
      }

      const {id} = child.props as ChipProps;
      const selected = this.state.selectedChipIds.indexOf(id!) > -1;
      if (selected) {
        this.state.foundation!.select(id!);
      }
    });
    this.setState({hasInitialized: true});
  }

  handleInteraction = (chipId: string) => {
    this.state.foundation!.handleChipInteraction(chipId);
  };

  handleSelect = (chipId: string, selected: boolean) => {
    this.state.foundation!.handleChipSelection(chipId, selected);
  };

  handleRemove = (chipId: string) => {
    this.state.foundation!.handleChipRemoval(chipId);
  };

  removeChip = (chipId: string) => {
    const {updateChips, children} = this.props;

    if (!children) return;

    const chips = React.Children.toArray(children)
      .filter(isElement)
      .slice() as React.ReactElement<ChipProps>[];

    for (let i = 0; i < chips.length; i++) {
      const chip = chips[i];
      if (chip.props.id === chipId) {
        chips.splice(i, 1);
        break;
      }
    }

    const chipsArray = chips.length ? chips.map((chip) => chip.props) : [];
    updateChips!(chipsArray);
  };

  setCheckmarkWidth = (checkmark: ChipCheckmark | null) => {
    if (!!this.checkmarkWidth || !checkmark) {
      return;
    }
    this.checkmarkWidth = checkmark.width;
  };

  computeBoundingRect = (chipElement: HTMLDivElement) => {
    const {height, width: chipWidth} = chipElement.getBoundingClientRect();
    const width = chipWidth + this.checkmarkWidth;
    return {height, width};
  };

  renderChip = (chip?: React.ReactNode) => {
    if (!chip || !isElement(chip)) return;

    const {choice, filter, input} = this.props;
    if ((choice || filter || input) && !chip.props.id) {
      throw new Error('Chip variant missing required property: id.');
    }

    const {selectedChipIds} = this.state;
    const selected = selectedChipIds.indexOf(chip.props.id) > -1;
    const {
      handleInteraction,
      handleSelect,
      handleRemove,
      ...chipProps
    } = chip.props;
    const props = Object.assign({}, ...chipProps, {
      selected,
      handleSelect: (id: string, selected: boolean): void => {
        handleSelect!(id, selected);
        this.handleSelect(id, selected);
      },
      handleInteraction: (id: string): void => {
        handleInteraction!(id);
        this.handleInteraction(id);
      },
      handleRemove: (id: string): void => {
        handleRemove!(id);
        this.handleRemove(id);
      },
      chipCheckmark: filter ? (
        <ChipCheckmark ref={this.setCheckmarkWidth} />
      ) : null,
      computeBoundingRect: filter ? this.computeBoundingRect : null,
    });
    return React.cloneElement(chip, props);
  };

  render() {
    // need foundation on state, because Chip calls a foundation method
    // before ChipSet mounts.
    if (!this.state.hasInitialized) return null;
    return (
      <div className={this.classes}>
        {React.Children.map(
          this.props.children as ChipType | ChipType[],
          this.renderChip
        )}
      </div>
    );
  }
}
