import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography
} from '@mui/material';

interface FullScreenReportImageProps {
    isOpen: boolean;
    onClose: () => void;
    imageUrls: string[];
}

const FullScreenReportImage: React.FC<FullScreenReportImageProps> = ({
    isOpen,
    onClose,
    imageUrls
}) => {

    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                <Typography variant="h5">Full Screen Image</Typography>
            </DialogTitle>
            <DialogContent>
                {imageUrls.map((imageUrl, index) => (
                    <img
                        key={index}
                        src={imageUrl}
                        alt={`Image ${index}`}
                    />
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default FullScreenReportImage;