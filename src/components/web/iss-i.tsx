
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Grid from '@mui/material/Grid';
import {Image} from 'astro:assets'

export default function Images() {
  return (
    <Grid container spacing={2}>
    <ImageList sx={{ width: 950, height: 250 }} variant="woven" cols={5} gap={8}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <Image
            src={`${item.img}?w=161&fit=crop&auto=format`}
            width={150}
            height={150}
            alt={item.title}
          />
        </ImageListItem>
      ))}
    </ImageList>
    </Grid>
  );
}

const itemData = [
  {
    img: '/1s.jpg',
    title: 'Security Guard',
  },
  {
    img: '/2s.webp',
    title: 'Warehouse Security',
  },
  {
    img: '/s.jpg',
    title: 'Fire & Safety',
  },
  {
    img: '/4s.jpg',
    title: 'Event Security',
  },
  {
    img: '/5s.png',
    title: 'Emergency Response',
  },
];