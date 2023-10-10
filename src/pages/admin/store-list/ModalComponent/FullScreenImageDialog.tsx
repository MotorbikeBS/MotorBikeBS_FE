// FullScreenImageDialog.tsx
import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
} from '@mui/material';

interface FullScreenImageDialogProps {
    isOpen: boolean;
    onClose: () => void;
    imageUrl: string;
}

const FullScreenImageDialog: React.FC<FullScreenImageDialogProps> = ({ isOpen, onClose, imageUrl }) => {
    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                <Typography variant="h5">Full Screen Image</Typography>
            </DialogTitle>
            <DialogContent>
                <img src={imageUrl} alt='Business License' style={{ width: '100%', height: 'auto' }} />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default FullScreenImageDialog;
