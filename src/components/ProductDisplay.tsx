import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Typography,
  Container,
  Paper,
  Divider,
  Fade,
  Zoom,
} from '@mui/material';
import { Grid } from '@mui/material';
import { motion } from 'framer-motion';

interface ProductDisplayProps {
  images: string[];
  name: string;
  phone: string;
  address: string;
  description: string;
  price: string;
  qrCode: string;
  currency?: string;
}

const currencySymbols: { [key: string]: string } = {
  CNY: '¥',
  USD: '$',
  JPY: '¥',
  KRW: '₩'
};

const ProductDisplay: React.FC<ProductDisplayProps> = ({
  images = [],
  name = '',
  phone = '',
  address = '',
  description = '',
  price = '',
  qrCode = '',
  currency = 'CNY',
}) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (images && Array.isArray(images)) {
      setLoading(false);
    }
  }, [images]);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  const formatPhoneNumber = (phoneNumber: string) => {
    if (phoneNumber.length >= 7) {
      const prefix = phoneNumber.slice(0, 3);
      const suffix = phoneNumber.slice(-4);
      return `${prefix}****${suffix}`;
    }
    return phoneNumber;
  };

  return (
    <Fade in timeout={1000}>
      <Container maxWidth="md" sx={{ py: 4, position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}>
          <Paper
            component={motion.div}
            whileHover={{ scale: 1.02, boxShadow: '0 12px 40px rgba(31, 38, 135, 0.2)' }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            elevation={3}
            sx={{
              p: 4,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
            }}>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Product Images */}
          {Array.isArray(images) && images.length > 0 && (
            <Zoom in timeout={1000}>
              <Box
                component={motion.div}
                whileHover={{ scale: 1.05, rotate: 1 }}
                whileTap={{ scale: 0.95 }}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 2,
                  justifyContent: 'center',
                  overflow: 'hidden',
                  borderRadius: '16px',
                  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                }}>
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image || ''}  // 添加默认值
                    alt={`${name || 'Product'} - ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '300px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                  />
                ))}
              </Box>
            </Zoom>
          )}

          {/* Product Information */}
          <Typography
            variant="h4"
            component={motion.h1}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            gutterBottom
            sx={{
              fontWeight: 600,
              color: '#1a237e',
              textAlign: 'center',
              mb: 3,
            }}>
            {name}
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
                  <Box
                  component={motion.div}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    p: 2,
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  }}>
                <Box>
                  <Typography variant="subtitle1" color="text.secondary">
                    {t('price')}
                  </Typography>
                  <Typography
                    variant="h5"
                    color="primary"
                    sx={{
                      fontWeight: 600,
                      fontSize: '2rem',
                      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                      backgroundClip: 'text',
                      textFillColor: 'transparent',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}>
                    {currencySymbols[currency]} {price}
                  </Typography>
                </Box>

                <Divider />

                <Box>
                  <Typography variant="subtitle1" color="text.secondary">
                    {t('description')}
                  </Typography>
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                    {description}
                  </Typography>
                </Box>

                <Divider />

                <Box>
                  <Typography variant="subtitle1" color="text.secondary">
                    {t('phone')}
                  </Typography>
                  <Typography variant="body1">{formatPhoneNumber(phone)}</Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle1" color="text.secondary">
                    {t('address')}
                  </Typography>
                  <Typography variant="body1">{address}</Typography>
                </Box>
                  </Box>
            </Grid>

            {/* QR Code */}
            <Grid item xs={12} md={4}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                  p: 3,
                  background: 'linear-gradient(145deg, rgba(255,255,255,1) 0%, rgba(240,240,240,0.8) 100%)',
                  borderRadius: '16px',
                  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
                  backdropFilter: 'blur(4px)',
                }}
              >
                <Typography
                  variant="h6"
                  align="center"
                  sx={{
                    fontWeight: 600,
                    color: '#1a237e',
                    mb: 1,
                  }}
                >
                  {t('qrCode')}
                </Typography>
                {qrCode && (
                  <Box
                    component={motion.div}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    <img
                      src={qrCode}
                      alt="Payment QR Code"
                      style={{
                        maxWidth: '100%',
                        maxHeight: '200px',
                        objectFit: 'contain',
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      }}
                    />
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
          </Paper>
        </motion.div>
      </Container>
    </Fade>
  );
};

export default ProductDisplay;