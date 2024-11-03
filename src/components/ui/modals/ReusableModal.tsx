import React, { ReactNode } from 'react';
import { Modal, Box, ModalProps } from '@mui/material';
import styles from 'components/ui/modals/ReusableModal.module.css';
import { useParams } from 'react-router-dom';
import { Lang } from '@/types';
import { translations } from '@/components/ui/modals/translations';

type ReusableModalProps = {
  open: boolean;
  handleClose: () => void;
  title: string;
  children: ReactNode;
} & ModalProps;

const ReusableModal: React.FC<ReusableModalProps> = ({
  open,
  handleClose,
  title,
  children,
  ...modalProps
}) => {
  const { lang } = useParams<{ lang: Lang }>();
  const translated = translations[lang ?? 'en'];

  return (
    <Modal open={open} onClose={handleClose} {...modalProps}>
      <Box className={styles.modalContent}>
        <h2 className={styles.textField}>{title || translated.defaultTitle}</h2>
        {children}
      </Box>
    </Modal>
  );
};

export default ReusableModal;
