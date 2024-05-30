import Box from "@mui/material/Box";
import { Helmet, HelmetProvider } from 'react-helmet-async';


type Props = {
  description?: string;
  children: JSX.Element | JSX.Element[];
  title?: string;
};

const PageContainer = ({ title, description, children }: Props) => (
  <HelmetProvider>

    <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
    </Helmet>

    <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="50vh"
    padding="20px"
    >
      
      {children}
    </Box>
  </HelmetProvider>
);

export default PageContainer;
