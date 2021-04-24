import { useRouter } from '../../components/CustomProvider';
import Layout from '../../components/Layout';

type Props = {};

const IndexPage = (props: Props) => {
  const { replace } = useRouter();

  replace('/coming-soon');

  return <Layout title="My Projects!"></Layout>;
};

export default IndexPage;
