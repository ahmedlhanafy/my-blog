import { ComingSoon } from '../../components/ComingSoon';
import Layout from '../../components/Layout';

type Props = {};

const IndexPage = (_: Props) => {
  return (
    <Layout
      title="Welcome to my library!"
      addHeader={{ rootElement: <IndexPage /> }}
    >
      <ComingSoon />
    </Layout>
  );
};

export default IndexPage;
