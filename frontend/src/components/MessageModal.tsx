import React from 'react';
import {
    Backdrop,
    Box,
    Modal,
    Fade,
    Button,
    Typography,
    IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/system';
//import theme from '../styles/theme'

const Header = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
});

const StyledModalBox = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: theme.palette.background.paper || "#fff", // Valor padrão
    borderRadius: "8px",
    boxShadow: (theme.shadows as string[])[5] || "0px 4px 10px rgba(0, 0, 0, 0.2)", // Garante o tipo como string[]
    padding: theme.spacing ? theme.spacing(3) : "16px", // Valor padrão se `spacing` for undefined
    textAlign: "center",
  }));
 
interface MessageModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    message: string;
    buttonName: string;
}

const MessageModal: React.FC<MessageModalProps> = ({ open, onClose, title, message, buttonName }) => {
    return (
        <Modal
        open={open}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          style: { backgroundColor: "rgba(0, 0, 0, 0.5)" }, // Fundo escuro
        }}
      >
        <Fade in={open}>
          <StyledModalBox>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
                {title}
              </Typography>
              <IconButton onClick={onClose} size="small">
                <CloseIcon />
              </IconButton>
            </Box>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {message}
            </Typography>
            <Button
              variant="contained"
              onClick={onClose}
              sx={{ mt: 2 }}
              color="primary"
            >
            { buttonName }
            </Button>
          </StyledModalBox>
        </Fade>
      </Modal>
    );
  };

export default MessageModal;
