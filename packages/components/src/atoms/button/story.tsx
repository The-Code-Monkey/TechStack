import Button from './index';

export default {
  title: 'Components / Atoms / Button',
  component: Button,
};

export const Default = () => <Button bg='neutrals.20'>Default Button</Button>;

export const Primary = () => <Button variant='primary'>Primary Button</Button>;

export const Secondary = () => (
  <Button variant='secondary'>Secondary Button</Button>
);

export const IconButtons = () => (
  <>
    <Button iconName='github'>left</Button>
    <Button iconName='github' iconPosition='top'>
      top
    </Button>
    <Button iconName='github' iconPosition='right'>
      right
    </Button>
    <Button iconName='github' iconPosition='bottom'>
      bottom
    </Button>
  </>
);

export const IconOnly = () => <Button iconName='github' />;
