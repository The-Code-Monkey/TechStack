import { Box, Button, BoxProps } from '@techstack/components';

interface Props extends BoxProps {
  onCancelClick: () => void;
  onSaveClick: () => void;

  saveLabel?: string;
  cancelLabel?: string;
  disabledSave?: boolean;

  disabledCancel?: boolean;

  disabled?: boolean;
}

const FormButtons = ({
  onCancelClick,
  onSaveClick,
  saveLabel = 'Save',
  cancelLabel = 'Cancel',
  disabledSave = false,
  disabledCancel = false,
  disabled = false,
  ...rest
}: Props) => {
  return (
    <Box
      d='flex'
      flexDir='row'
      justifyContent='space-between'
      px='1em'
      py='3'
      bg='neutrals.10'
      h='10'
      {...rest}
    >
      <Button
        disabled={disabled || disabledSave}
        onClick={onSaveClick}
        intent='success'
      >
        {saveLabel}
      </Button>
      <Button
        disabled={disabled || disabledCancel}
        onClick={onCancelClick}
        intent='error'
      >
        {cancelLabel}
      </Button>
    </Box>
  );
};

export default FormButtons;
