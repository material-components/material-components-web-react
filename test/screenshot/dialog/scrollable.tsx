import React from 'react';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
} from '../../../packages/dialog/index';
import Button from '../../../packages/button/index';
import './index.scss';

class Scrollable extends React.Component<
  {},
  {isOpen: boolean; action: string}
> {
  state = {isOpen: true, action: ''};

  render() {
    return (
      <main className='mdc-layout-grid'>
        <aside>
          <Button
            raised
            onClick={() => this.setState({isOpen: !this.state.isOpen})}
          >
            {this.state.isOpen ? 'close dialog' : 'open dialog'}
          </Button>
          <p className='mdc-typography--body1'>
            Dialog Action:
            <samp>&emsp;{this.state.action}</samp>
          </p>
        </aside>
        <Dialog
          onClose={(action: string) => this.setState({isOpen: false, action})}
          open={this.state.isOpen}
        >
          <DialogTitle>The Wonderfull Wizard of Oz</DialogTitle>
          <DialogContent>
            <p className='mdc-typography--body1'>
              Dorothy lived in the midst of the great Kansas prairies, with
              Uncle Henry, who was a farmer, and Aunt Em, who was the farmers
              wife. Their house was small, for the lumber to build it had to be
              carried by wagon many miles. There were four walls, a floor and a
              roof, which made one room; and this room contained a rusty looking
              cookstove, a cupboard for the dishes, a table, three or four
              chairs, and the beds. Uncle Henry and Aunt Em had a big bed in one
              corner, and Dorothy a little bed in another corner. There was no
              garret at all, and no cellar--except a small hole dug in the
              ground, called a cyclone cellar, where the family could go in case
              one of those great whirlwinds arose, mighty enough to crush any
              building in its path. It was reached by a trap door in the middle
              of the floor, from which a ladder led down into the small, dark
              hole.
            </p>
            <p className='mdc-typography--body1'>
              When Dorothy stood in the doorway and looked around, she could see
              nothing but the great gray prairie on every side. Not a tree nor a
              house broke the broad sweep of flat country that reached to the
              edge of the sky in all directions. The sun had baked the plowed
              land into a gray mass, with little cracks running through it. Even
              the grass was not green, for the sun had burned the tops of the
              long blades until they were the same gray color to be seen
              everywhere. Once the house had been painted, but the sun blistered
              the paint and the rains washed it away, and now the house was as
              dull and gray as everything else.
            </p>
            <p className='mdc-typography--body1'>
              When Aunt Em came there to live she was a young, pretty wife. The
              sun and wind had changed her, too. They had taken the sparkle from
              her eyes and left them a sober gray; they had taken the red from
              her cheeks and lips, and they were gray also. She was thin and
              gaunt, and never smiled now. When Dorothy, who was an orphan,
              first came to her, Aunt Em had been so startled by the childs
              laughter that she would scream and press her hand upon her heart
              whenever Dorothys merry voice reached her ears; and she still
              looked at the little girl with wonder that she could find anything
              to laugh at.
            </p>
            <p className='mdc-typography--body1'>
              Uncle Henry never laughed. He worked hard from morning till night
              and did not know what joy was. He was gray also, from his long
              beard to his rough boots, and he looked stern and solemn, and
              rarely spoke.
            </p>
            <p className='mdc-typography--body1'>
              It was Toto that made Dorothy laugh, and saved her from growing as
              gray as her other surroundings. Toto was not gray; he was a little
              black dog, with long silky hair and small black eyes that twinkled
              merrily on either side of his funny, wee nose. Toto played all day
              long, and Dorothy played with him, and loved him dearly.
            </p>
            <p className='mdc-typography--body1'>
              Today, however, they were not playing. Uncle Henry sat upon the
              doorstep and looked anxiously at the sky, which was even grayer
              than usual. Dorothy stood in the door with Toto in her arms, and
              looked at the sky too. Aunt Em was washing the dishes.
            </p>
            <p className='mdc-typography--body1'>
              From the far north they heard a low wail of the wind, and Uncle
              Henry and Dorothy could see where the long grass bowed in waves
              before the coming storm. There now came a sharp whistling in the
              air from the south, and as they turned their eyes that way they
              saw ripples in the grass coming from that direction also.
            </p>
          </DialogContent>
          <DialogFooter>
            <DialogButton action='dismiss'>Decline</DialogButton>
            <DialogButton action='discard' isDefault>
              Accept
            </DialogButton>
          </DialogFooter>
        </Dialog>
      </main>
    );
  }
}

export default Scrollable;
