import { Button } from './index';

export default {
  title: 'Components / Atoms / Button',
  component: Button,
};

export const Default = () => <Button>Default Button</Button>;

export const Primary = () => <Button variant='primary'>Primary Button</Button>;

export const Secondary = () => (
  <Button variant='secondary'>Secondary Button</Button>
);

export const Intents = () => (
  <>
    <Button intent='success'>success Button</Button>
    <Button intent='warning'>warning Button</Button>
    <Button intent='error'>error Button</Button>
    <Button intent='info'>info Button</Button>
    <Button intent='pending'>pending Button</Button>
  </>
);

export const IconButtons = () => (
  <>
    <Button iconName='Github'>left</Button>
    <Button iconName='Github' iconPosition='top'>
      top
    </Button>
    <Button iconName='Github' iconPosition='right'>
      right
    </Button>
    <Button iconName='Github' iconPosition='bottom'>
      bottom
    </Button>
  </>
);

export const IconOnly = () => <Button iconName='Github' />;
export const Draggable = () => (
  <Button
    iconName='Github'
    draggable
    onDragStart={() => console.log('START DRAG')}
  />
);
