import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import React from 'react'


interface IFullScreenImageDialogProps {
    isOpen: boolean;
    onClose: () => void;
    imageUrls: string[];
}

const TradeHistoryImgeDialog: React.FC<IFullScreenImageDialogProps> = ({
    isOpen,
    onClose,
    imageUrls
}) => {
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            maxWidth='md'
            fullWidth
        >
            <DialogTitle>
                <Typography
                    variant="h5"
                >
                    Hình ảnh hợp đồng đầy đủ
                </Typography>
            </DialogTitle>
            <DialogContent>
                {imageUrls.map((imageUrl, index) => (
                    <div key={index}>
                        <img
                            src={imageUrl}
                            alt={`Image ${index}`}
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </div>
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default TradeHistoryImgeDialog