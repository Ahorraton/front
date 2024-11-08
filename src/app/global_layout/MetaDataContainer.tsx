import Box from "@mui/material/Box";
import { Helmet, HelmetProvider } from "react-helmet-async";

type Props = {
  description?: string;
  children: JSX.Element | JSX.Element[];
  title?: string;
};

const MetaDataContainer = ({ title, description, children }: Props) => (
  <HelmetProvider>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>

    <Box>{children}</Box>
  </HelmetProvider>
);

export default MetaDataContainer;
