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
import * as React from 'react';
import classnames from 'classnames';
import {MDCChipSetFoundation} from '@material/chips';
// @ts-ignore
import ChipCheckmark from './ChipCheckmark.tsx';

export interface ChipSetProps {
  className: string,
  selectedChipIds: string[],
  handleSelect: (selectedChipIds: string[]) => void,
  updateChips: (chips: React.ReactNode) => void,
  choice: boolean,
  filter: boolean,
  input: boolean,
  children: React.ReactElement<HTMLElement>[]
};

type ChipSetState = {
  foundation: MDCChipSetFoundation,
  selectedChipIds: string[],
  hasInitialized: boolean
};

export default class ChipSet extends React.Component<ChipSetProps, ChipSetState> {
  checkmarkWidth_ = 0;
  constructor(props) {
    super(props);
    this.state = {
      selectedChipIds: props.selectedChipIds,
      foundation: null,
      hasInitialized: false,
    };
  }

  static defaultProps = {
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

  componentDidUpdate(prevProps, prevState) {
    const {selectedChipIds} = this.props;
    if (this.state.foundation !== prevState.foundation) {
      this.initChipSelection();
    }
    if (selectedChipIds !== prevProps.selectedChipIds) {
      this.setState({selectedChipIds});
    }
  }

  componentWillUnmount() {
    this.state.foundation.destroy();
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
      hasClass: (className) => this.classes.split(' ').includes(className),
      setSelected: () => {
        const selectedChipIds = this.state.foundation.getSelectedChipIds();
        this.setState({selectedChipIds}, () => {
          this.props.handleSelect(selectedChipIds);
        });
      },
      removeChip: this.removeChip,
    };
  }

  initChipSelection() {
    React.Children.forEach(this.props.children, (child: React.ReactElement<HTMLElement>) => {
      const {id} = (child).props;
      const selected = this.state.selectedChipIds.indexOf(id) > -1;
      if (selected) {
        this.state.foundation.select(id);
      }
    });
    this.setState({hasInitialized: true});
  }

  handleInteraction = (chipId) => {
    this.state.foundation.handleChipInteraction(chipId);
  };

  handleSelect = (chipId, selected) => {
    this.state.foundation.handleChipSelection(chipId, selected);
  };

  handleRemove = (chipId) => {
    this.state.foundation.handleChipRemoval(chipId);
  };

  removeChip = (chipId) => {
    const {updateChips, children} = this.props;
    if (!children) return;
    const chips = React.Children.toArray(children).slice() as React.ReactElement<HTMLElement>[];
    for (let i = 0; i < chips.length; i++) {
      const chip = chips[i];
      if (chip.props.id === chipId) {
        chips.splice(i, 1);
        break;
      }
    }
    const chipsArray = chips.length ? chips.map((chip) => chip.props) : [];
    updateChips(chipsArray);
  };

  setCheckmarkWidth = (checkmark) => {
    if (!!this.checkmarkWidth_) {
      return;
    }
    this.checkmarkWidth_ = checkmark.width;
  };

  computeBoundingRect = (chipElement) => {
    const {height, width: chipWidth} = chipElement.getBoundingClientRect();
    const width = chipWidth + this.checkmarkWidth_;
    return {height, width};
  };

  renderChip = (chip) => {
    const {filter} = this.props;
    const {selectedChipIds} = this.state;
    const selected = selectedChipIds.indexOf(chip.props.id) > -1;
    const props = Object.assign(
      {},
      ...chip.props,
      {
        selected,
        handleSelect: this.handleSelect,
        handleInteraction: this.handleInteraction,
        handleRemove: this.handleRemove,
        chipCheckmark: filter ? (
          <ChipCheckmark ref={this.setCheckmarkWidth} />
        ) : null,
        computeBoundingRect: filter ? this.computeBoundingRect : null,
      },
    );
    return React.cloneElement(chip, props);
  };

  render() {
    // need foundation on state, because Chip calls a foundation method
    // before ChipSet mounts.
    if (!this.state.hasInitialized) return null;
    return (
      <div className={this.classes}>
        {React.Children.map(this.props.children, this.renderChip)}
      </div>
    );
  }
}

