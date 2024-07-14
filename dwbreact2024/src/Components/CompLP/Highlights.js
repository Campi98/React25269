import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';

const items = [
  {
    icon: <SettingsSuggestRoundedIcon />,
    title: 'Instituição',
    description:
      'Instituto Politécnico de Tomar > Escola Superior de Tecnologia de Tomar > Licenciatura em Engenharia Informática',
  },
  {
    icon: <ConstructionRoundedIcon />,
    title: 'Disciplina',
    description:
      'Desenvolvimento Web 2023/2024, 2º Semestre',
  },
  {
    icon: <ConstructionRoundedIcon />,
    title: 'Aluno',
    description:
      'João Campos nº25269 Turma A',
  },
  {
    icon: <ThumbUpAltRoundedIcon />,
    title: 'Conecte-se com outros viajantes',
    description:
      'Encontre pessoas com interesses de viagem semelhantes e planeie viagens em conjunto.',
  },
  {
    icon: <AutoFixHighRoundedIcon />,
    title: 'Planeamento de viagens',
    description:
      'Utilize as nossas ferramentas para planear todos os detalhes da sua viagem, desde o alojamento até as atividades.',
  },
  {
    icon: <SupportAgentRoundedIcon />,
    title: 'Partilha de experiências',
    description:
      'Compartilhe as suas aventuras e veja o que outros viajantes estão a fazer.',
  },
  {
    icon: <QueryStatsRoundedIcon />,
    title: 'Economize dinheiro',
    description:
      'Viaje em grupo e aproveite as economias ao partilhar custos de transporte e alojamento.',
  },
  {
    icon: <QueryStatsRoundedIcon />,
    title: 'Segurança e confiança',
    description:
      'Perfis verificados e avaliações de utilizadores para garantir uma experiência segura e confiável.',
  },
  {
    icon: <QueryStatsRoundedIcon />,
    title: 'Comunidade de apoio',
    description:
      'Faça parte de uma comunidade global de viajantes prontos para ajudar e inspirar.',
  },
];

export default function Highlights() {
  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'white',
        bgcolor: '#06090a',
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <Typography component="h2" variant="h4">
            Acerca
          </Typography>
        </Box>
        <Grid container spacing={2.5}>
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Stack
                direction="column"
                color="inherit"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  p: 3,
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'grey.800',
                  background: 'transparent',
                  backgroundColor: 'grey.900',
                }}
              >
                <Box sx={{ opacity: '50%' }}>{item.icon}</Box>
                <div>
                  <Typography fontWeight="medium" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.400' }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}