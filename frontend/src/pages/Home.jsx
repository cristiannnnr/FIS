import { useState, useEffect, useCallback } from 'react';
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Container,
  Paper,
  Divider,
  Avatar,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  Pets,
  LocalHospital,
  Favorite,
  Security,
  Speed,
  CheckCircle,
  ArrowForward,
  Phone,
  Email,
  ArrowBackIosNew,
  ArrowForwardIos
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Importar imágenes locales
import heroImage from '../assets/Hero.png';

function useSlideWidth() {
  const getWidth = useCallback(() => (window.innerWidth >= 900 ? 400 : 280), []);
  const [slideWidth, setSlideWidth] = useState(typeof window !== 'undefined' ? getWidth() : null);
  useEffect(() => {
    const handleResize = () => setSlideWidth(getWidth());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getWidth]);
  return slideWidth;
}

export default function Home() {
  // Mueve happyPets aquí arriba
  const happyPets = [
    {
      img: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=600&q=80',
      name: 'Luna & Familia',
      desc: 'Luna encontró un hogar lleno de amor y juegos.'
    },
    {
      img: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=600&q=80',
      name: 'Max & Sus nuevos amigos',
      desc: 'Max disfruta de paseos diarios y muchos abrazos.'
    },
    {
      img: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=600&q=80',
      name: 'Milo & Sofía',
      desc: 'Milo y Sofía son inseparables desde la adopción.'
    },
    {
      img: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=600&q=80',
      name: 'Toby & Familia',
      desc: 'Toby disfruta de tardes de juegos en el parque.'
    },
    {
      img: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=600&q=80',
      name: 'Nina & Lucas',
      desc: 'Nina y Lucas comparten aventuras todos los días.'
    },
    {
      img: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=600&q=80',
      name: 'Simba & Familia',
      desc: 'Simba encontró una familia que lo adora.'
    },
    {
      img: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=600&q=80',
      name: 'Coco & Ana',
      desc: 'Coco y Ana son inseparables desde el primer día.'
    }
  ];
  const [stats, setStats] = useState({
    mascotas: 0,
    centros: 0,
    adopciones: 0
  });
  const [mascotasDestacadas, setMascotasDestacadas] = useState([]);
  const navigate = useNavigate();
  const slideWidth = useSlideWidth();
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const slideDuration = 600; // ms

  useEffect(() => {
    if (slideWidth === null) return;
    const interval = setInterval(() => {
      setIsSliding(true);
      setTimeout(() => {
        setGalleryIndex((prev) => (prev + 1) % happyPets.length);
        setIsSliding(false);
      }, slideDuration);
    }, 3000);
    return () => clearInterval(interval);
  }, [happyPets.length, slideWidth]);

  useEffect(() => {
    cargarEstadisticas();
    cargarMascotasDestacadas();
  }, []);

  function cargarEstadisticas() {
    Promise.all([
      axios.get('http://localhost:3001/api/mascotas'),
      axios.get('http://localhost:3001/api/centros'),
      axios.get('http://localhost:3001/api/solicitudes')
    ]).then(([mascotasRes, centrosRes, solicitudesRes]) => {
      setStats({
        mascotas: mascotasRes.data.length,
        centros: centrosRes.data.length,
        adopciones: solicitudesRes.data.length
      });
    }).catch(err => {
      console.log('Error cargando estadísticas:', err);
    });
  }

  function cargarMascotasDestacadas() {
    axios.get('http://localhost:3001/api/mascotas')
      .then(res => {
        const disponibles = res.data.filter(m => m.estado === 'Disponible').slice(0, 3);
        setMascotasDestacadas(disponibles);
      })
      .catch(err => {
        console.log('Error cargando mascotas destacadas:', err);
      });
  }

  return (
    <Box sx={{ 
      background: '#ffffff',
      minHeight: '100vh'
    }}>
      {/* Hero Section */}
      <Box sx={{ 
        background: '#fff',
        color: '#2c3e50',
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: 700,
              mb: 3,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              lineHeight: 1.2
            }}
          >
            Sistema de Adopciones
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 4,
              opacity: 0.9,
              lineHeight: 1.6,
              fontWeight: 300
            }}
          >
            Plataforma integral para la gestión y adopción de mascotas. 
            Conectamos mascotas necesitadas con familias amorosas.
          </Typography>

          {/* Botones debajo de la descripción */}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', mb: 4 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/mascotas')}
              sx={{
                bgcolor: '#667eea',
                color: 'white',
                px: 4,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 600,
                boxShadow: '0 2px 8px rgba(102,126,234,0.08)',
                '&:hover': { 
                  bgcolor: '#5a6fd8',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Ver Mascotas
              <ArrowForward sx={{ ml: 1 }} />
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/centros')}
              sx={{
                borderColor: '#667eea',
                color: '#667eea',
                px: 4,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 600,
                '&:hover': { 
                  borderColor: '#5a6fd8', 
                  bgcolor: 'rgba(102,126,234,0.08)',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Centros
            </Button>
          </Box>
        </Container>

        {/* Imagen principal ocupando todo el ancho */}
        <Box
          component="img"
          src={heroImage}
          alt="Sistema de Adopciones"
          sx={{
            width: '100vw',
            maxWidth: '100vw',
            height: { xs: 220, md: 350 },
            objectFit: 'cover',
            borderRadius: 0,
            boxShadow: '0 20px 40px rgba(0,0,0,0.07)',
            mt: { xs: 28, md: 18 },
            mb: 0,
            mx: 'auto',
            display: 'block',
            position: 'relative',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        />
      </Box>

      {/* Separador decorativo */}
      <Box sx={{ width: '100%', height: 32, background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)', opacity: 0.08, mb: 4 }} />

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              textAlign: 'center', 
              p: 4,
              borderRadius: 4,
              boxShadow: '0 8px 32px rgba(102,126,234,0.10)',
              border: 'none',
              background: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)',
              transition: 'transform 0.3s cubic-bezier(.4,2,.6,1)',
              '&:hover': { transform: 'scale(1.04)' }
            }}>
              <Avatar sx={{ 
                bgcolor: '#667eea', 
                width: 90, 
                height: 90, 
                mx: 'auto', 
                mb: 3,
                boxShadow: '0 4px 16px rgba(102,126,234,0.18)'
              }}>
                <Pets sx={{ fontSize: 48 }} />
              </Avatar>
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, color: '#2c3e50', letterSpacing: 1 }}>
                {stats.mascotas}
              </Typography>
              <Typography variant="h6" sx={{ color: '#667eea', fontWeight: 600, letterSpacing: 1 }}>
                Mascotas Disponibles
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              textAlign: 'center', 
              p: 4,
              borderRadius: 4,
              boxShadow: '0 8px 32px rgba(76,175,80,0.10)',
              border: 'none',
              background: 'linear-gradient(135deg, #e8f5e9 0%, #f8fafc 100%)',
              transition: 'transform 0.3s cubic-bezier(.4,2,.6,1)',
              '&:hover': { transform: 'scale(1.04)' }
            }}>
              <Avatar sx={{ 
                bgcolor: '#4caf50', 
                width: 90, 
                height: 90, 
                mx: 'auto', 
                mb: 3,
                boxShadow: '0 4px 16px rgba(76,175,80,0.18)'
              }}>
                <LocalHospital sx={{ fontSize: 48 }} />
              </Avatar>
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, color: '#2c3e50', letterSpacing: 1 }}>
                {stats.centros}
              </Typography>
              <Typography variant="h6" sx={{ color: '#4caf50', fontWeight: 600, letterSpacing: 1 }}>
                Centros de Atención
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              textAlign: 'center', 
              p: 4,
              borderRadius: 4,
              boxShadow: '0 8px 32px rgba(255,152,0,0.10)',
              border: 'none',
              background: 'linear-gradient(135deg, #fff3e0 0%, #f8fafc 100%)',
              transition: 'transform 0.3s cubic-bezier(.4,2,.6,1)',
              '&:hover': { transform: 'scale(1.04)' }
            }}>
              <Avatar sx={{ 
                bgcolor: '#ff9800', 
                width: 90, 
                height: 90, 
                mx: 'auto', 
                mb: 3,
                boxShadow: '0 4px 16px rgba(255,152,0,0.18)'
              }}>
                <Favorite sx={{ fontSize: 48 }} />
              </Avatar>
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, color: '#2c3e50', letterSpacing: 1 }}>
                {stats.adopciones}
              </Typography>
              <Typography variant="h6" sx={{ color: '#ff9800', fontWeight: 600, letterSpacing: 1 }}>
                Adopciones Realizadas
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Separador decorativo */}
      <Box sx={{ width: '100%', height: 32, background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)', opacity: 0.08, mb: 4 }} />

      {/* Mascotas Destacadas */}
      {mascotasDestacadas.length > 0 && (
        <Box sx={{ py: 8, bgcolor: '#f8f9fa' }}>
          <Container maxWidth="lg">
            <Typography variant="h3" sx={{ 
              textAlign: 'center', 
              mb: 6, 
              fontWeight: 800, 
              color: '#667eea',
              letterSpacing: 1
            }}>
              Mascotas Destacadas
            </Typography>
            <Grid container spacing={4}>
              {mascotasDestacadas.map((mascota) => (
                <Grid item xs={12} md={4} key={mascota.id}>
                  <Card sx={{ 
                    height: '100%',
                    borderRadius: 4,
                    overflow: 'hidden',
                    boxShadow: '0 8px 32px rgba(102,126,234,0.10)',
                    border: 'none',
                    transition: 'all 0.3s cubic-bezier(.4,2,.6,1)',
                    '&:hover': { 
                      transform: 'translateY(-8px) scale(1.03)',
                      boxShadow: '0 16px 48px rgba(102,126,234,0.18)'
                    }
                  }}>
                    <Box
                      component="img"
                      src={mascota.foto || 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400&h=250&fit=crop'}
                      alt={mascota.nombre}
                      sx={{
                        width: '100%',
                        height: 250,
                        objectFit: 'cover',
                        filter: 'brightness(0.97)'
                      }}
                    />
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#2c3e50', letterSpacing: 1 }}>
                        {mascota.nombre}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
                        <Chip 
                          label={mascota.especie} 
                          size="small" 
                          sx={{ bgcolor: '#667eea', color: 'white', fontWeight: 500 }} 
                        />
                        <Chip 
                          label={mascota.raza} 
                          size="small" 
                          variant="outlined" 
                          sx={{ borderColor: '#667eea', color: '#667eea' }}
                        />
                        <Chip 
                          label={`${mascota.edad} años`} 
                          size="small" 
                          variant="outlined"
                          sx={{ borderColor: '#7f8c8d', color: '#7f8c8d' }}
                        />
                      </Box>
                      <Typography variant="body2" sx={{ 
                        color: '#7f8c8d', 
                        mb: 3, 
                        lineHeight: 1.6,
                        minHeight: 48
                      }}>
                        {mascota.descripcion?.substring(0, 120)}...
                      </Typography>
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={() => navigate('/mascotas')}
                        sx={{
                          bgcolor: '#667eea',
                          '&:hover': { bgcolor: '#5a6fd8' },
                          borderRadius: 2,
                          py: 1.5,
                          fontWeight: 600,
                          fontSize: '1rem',
                          boxShadow: '0 2px 8px rgba(102,126,234,0.08)'
                        }}
                      >
                        Ver Detalles
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      )}

      {/* Galería de mascotas felices */}
      {slideWidth && (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" sx={{ textAlign: 'center', mb: 1, fontWeight: 800, color: '#4caf50', letterSpacing: 1 }}>
          Mascotas Felices con sus Familias
        </Typography>
        <Typography variant="subtitle1" sx={{ textAlign: 'center', mb: 5, color: '#667eea', fontWeight: 600, letterSpacing: 1, animation: 'fadeIn 2s infinite alternate' }}>
          ¡Historias reales de adopción!
        </Typography>
        <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          {/* Flecha izquierda */}
          <Button
            onClick={() => {
              setIsSliding(true);
              setTimeout(() => {
                setGalleryIndex((prev) => (prev - 1 + happyPets.length) % happyPets.length);
                setIsSliding(false);
              }, slideDuration);
            }}
            sx={{
              position: 'absolute',
              left: { xs: 8, md: 32 },
              top: { xs: 'calc(50% + 40px)', md: 'calc(50% + 40px)' },
              transform: 'translateY(-50%)',
              zIndex: 3,
              minWidth: 0,
              width: 56,
              height: 56,
              borderRadius: '50%',
              bgcolor: 'rgba(255,255,255,0.85)',
              boxShadow: '0 2px 8px rgba(44,62,80,0.10)',
              p: 0,
              '&:hover': { bgcolor: '#f0f0f0' }
            }}
          >
            <ArrowBackIosNew sx={{ fontSize: 32, color: '#4caf50' }} />
          </Button>
          {/* Imagen y slide animado */}
          <Box sx={{ width: { xs: 280, md: 500 }, height: { xs: 220, md: 360 }, overflow: 'hidden', borderRadius: 4, boxShadow: '0 4px 16px 0 #2c3e5020', position: 'relative', mx: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
            {happyPets.map((pet, idx) => (
              <Box
                key={pet.name + idx}
                sx={{
                  position: idx === galleryIndex ? 'relative' : 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  opacity: idx === galleryIndex ? 1 : 0,
                  zIndex: idx === galleryIndex ? 2 : 1,
                  transition: 'opacity 1.2s cubic-bezier(.7,1.5,.7,1), transform 1.2s cubic-bezier(.7,1.5,.7,1)',
                  transform: idx === galleryIndex ? 'translateX(0)' : idx < galleryIndex ? 'translateX(-60px)' : 'translateX(60px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box
                  component="img"
                  src={pet.img}
                  alt={pet.name}
                  onError={e => { e.target.onerror = null; e.target.src = 'https://placekitten.com/600/360'; }}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: 4,
                    boxShadow: '0 2px 8px #2c3e5020',
                    transition: 'transform 0.7s',
                    '&:hover': { transform: 'scale(1.04)' }
                  }}
                />
                {/* Fondo translúcido con nombre y descripción */}
                <Box sx={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  bgcolor: 'rgba(44,62,80,0.60)',
                  color: '#fff',
                  px: 3,
                  py: 2,
                  borderBottomLeftRadius: 16,
                  borderBottomRightRadius: 16,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>{pet.name}</Typography>
                  <Typography variant="body2" sx={{ fontStyle: 'italic', opacity: 0.9 }}>{pet.desc}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
          {/* Flecha derecha */}
          <Button
            onClick={() => {
              setIsSliding(true);
              setTimeout(() => {
                setGalleryIndex((prev) => (prev + 1) % happyPets.length);
                setIsSliding(false);
              }, slideDuration);
            }}
            sx={{
              position: 'absolute',
              right: { xs: 8, md: 32 },
              top: { xs: 'calc(50% + 40px)', md: 'calc(50% + 40px)' },
              transform: 'translateY(-50%)',
              zIndex: 3,
              minWidth: 0,
              width: 56,
              height: 56,
              borderRadius: '50%',
              bgcolor: 'rgba(255,255,255,0.85)',
              boxShadow: '0 2px 8px rgba(44,62,80,0.10)',
              p: 0,
              '&:hover': { bgcolor: '#f0f0f0' }
            }}
          >
            <ArrowForwardIos sx={{ fontSize: 32, color: '#4caf50' }} />
          </Button>
        </Box>
        {/* Dots animados más abajo */}
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
          {happyPets.map((_, i) => (
            <Box key={i} sx={{ width: 18, height: 18, borderRadius: '50%', bgcolor: i === galleryIndex ? '#4caf50' : '#e0e0e0', boxShadow: i === galleryIndex ? '0 2px 8px #4caf5040' : 'none', transition: 'background 0.3s, box-shadow 0.3s, transform 0.3s', border: i === galleryIndex ? '2px solid #fff' : 'none', transform: i === galleryIndex ? 'scale(1.25)' : 'scale(1)' }} />
          ))}
        </Box>
        <style>{`@keyframes fadeIn { from { opacity: 0.5; } to { opacity: 1; } }`}</style>
      </Container>
      )}

      {/* Separador decorativo */}
      <Box sx={{ width: '100%', height: 32, background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)', opacity: 0.08, mb: 4 }} />

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" sx={{ 
          textAlign: 'center', 
          mb: 8, 
          fontWeight: 800, 
          color: '#2c3e50',
          letterSpacing: 1
        }}>
          Características del Sistema
        </Typography>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 4 }}>
              <Avatar sx={{ 
                bgcolor: '#667eea', 
                width: 60, 
                height: 60, 
                mr: 3,
                boxShadow: '0 2px 8px rgba(102,126,234,0.12)'
              }}>
                <Pets sx={{ fontSize: 30 }} />
              </Avatar>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#2c3e50', letterSpacing: 1 }}>
                  Gestión de Mascotas
                </Typography>
                <Typography variant="body1" sx={{ color: '#7f8c8d', lineHeight: 1.7 }}>
                  Administra el inventario completo de mascotas disponibles para adopción. 
                  Incluye fotos, detalles médicos y información personalizada de cada mascota.
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 4 }}>
              <Avatar sx={{ 
                bgcolor: '#4caf50', 
                width: 60, 
                height: 60, 
                mr: 3,
                boxShadow: '0 2px 8px rgba(76,175,80,0.12)'
              }}>
                <LocalHospital sx={{ fontSize: 30 }} />
              </Avatar>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#2c3e50', letterSpacing: 1 }}>
                  Centros de Atención
                </Typography>
                <Typography variant="body1" sx={{ color: '#7f8c8d', lineHeight: 1.7 }}>
                  Gestiona centros veterinarios y refugios asociados. 
                  Mantén información actualizada de ubicaciones, horarios y servicios.
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 4 }}>
              <Avatar sx={{ 
                bgcolor: '#ff9800', 
                width: 60, 
                height: 60, 
                mr: 3,
                boxShadow: '0 2px 8px rgba(255,152,0,0.12)'
              }}>
                <Favorite sx={{ fontSize: 30 }} />
              </Avatar>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#2c3e50', letterSpacing: 1 }}>
                  Solicitudes de Adopción
                </Typography>
                <Typography variant="body1" sx={{ color: '#7f8c8d', lineHeight: 1.7 }}>
                  Procesa y gestiona solicitudes de adopción de manera eficiente. 
                  Seguimiento completo del proceso desde la solicitud hasta la adopción.
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 4 }}>
              <Avatar sx={{ 
                bgcolor: '#9c27b0', 
                width: 60, 
                height: 60, 
                mr: 3,
                boxShadow: '0 2px 8px rgba(156,39,176,0.12)'
              }}>
                <Security sx={{ fontSize: 30 }} />
              </Avatar>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#2c3e50', letterSpacing: 1 }}>
                  Sistema Seguro
                </Typography>
                <Typography variant="body1" sx={{ color: '#7f8c8d', lineHeight: 1.7 }}>
                  Autenticación JWT y control de acceso basado en roles. 
                  Protección completa de datos sensibles y información personal.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Separador decorativo */}
      <Box sx={{ width: '100%', height: 32, background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)', opacity: 0.08, mb: 4 }} />

       {/* FAQ Section */}
       <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography variant="h3" sx={{ textAlign: 'center', mb: 6, fontWeight: 800, color: '#667eea', letterSpacing: 1 }}>
          Preguntas Frecuentes
        </Typography>
        <Box>
          <Accordion>
            <AccordionSummary expandIcon={<ArrowForward />}>
              <Typography sx={{ fontWeight: 600 }}>¿Cómo puedo adoptar una mascota?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Debes registrarte en la plataforma, buscar una mascota disponible y enviar una solicitud de adopción. Un centro de atención se pondrá en contacto contigo para continuar el proceso.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ArrowForward />}>
              <Typography sx={{ fontWeight: 600 }}>¿Cuáles son los requisitos para adoptar?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Ser mayor de edad, presentar identificación y demostrar capacidad para cuidar a la mascota. Algunos centros pueden requerir una entrevista o visita domiciliaria.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ArrowForward />}>
              <Typography sx={{ fontWeight: 600 }}>¿Puedo adoptar si tengo otras mascotas?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Sí, pero es importante informar al centro sobre tus otras mascotas para asegurar una integración adecuada y el bienestar de todos.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ArrowForward />}>
              <Typography sx={{ fontWeight: 600 }}>¿Qué incluye la adopción?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                La mayoría de las adopciones incluyen vacunación, desparasitación y, en muchos casos, esterilización. Consulta los detalles con el centro de atención.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Container>

      {/* Separador decorativo */}
      <Box sx={{ width: '100%', height: 32, background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)', opacity: 0.08, mb: 4 }} />

       {/* CTA Section */}
       <Box sx={{ 
         bgcolor: '#2c3e50',
         color: 'white',
         py: 8
       }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3" sx={{ 
              fontWeight: 700, 
              mb: 3 
            }}>
              ¿Listo para empezar?
            </Typography>
            <Typography variant="h6" sx={{ 
              mb: 4, 
              opacity: 0.9,
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.6
            }}>
              Únete a nuestra comunidad y ayuda a encontrar hogares amorosos 
              para mascotas que necesitan una familia.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/mascotas')}
              sx={{
                bgcolor: '#667eea',
                '&:hover': { bgcolor: '#5a6fd8' },
                px: 6,
                py: 2,
                borderRadius: 2,
                fontWeight: 600,
                fontSize: '1.1rem'
              }}
            >
              Explorar Mascotas
              <ArrowForward sx={{ ml: 1 }} />
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
