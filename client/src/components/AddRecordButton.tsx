import { useState } from 'react';
import { Button, Dialog, DialogTitle, Box } from '@mui/material';
import { GridToolbarContainer } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import { testIds } from '@/components/testIds';
// import { RecordForm } from './RecordForm';

type Props = {
  formComponent: JSX.Element;
  title: string;
};
export const AddRecordButton = (props: Props) => {
  const { formComponent, title } = props;
  const [openDialog, setOpenDialog] = useState(false);

  const handleButtonClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    // Reset form data when closing the dialog
  };

  return (
    <Box data-test-id={testIds.addRecordButton.container}>
      <GridToolbarContainer>
        <Button
          color='primary'
          startIcon={<AddIcon />}
          onClick={handleButtonClick}
        >
          Add record
        </Button>
      </GridToolbarContainer>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{title}</DialogTitle>
        {formComponent}
      </Dialog>
    </Box>
  );
};
