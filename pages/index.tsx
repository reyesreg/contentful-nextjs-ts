import type { GetStaticProps, NextPage } from "next";

import { IPostFields } from "../src/@types/contentful";
import ContentService from "../src/util/content-service";
import CustomFooter from "../components/CustomFooter";
import CustomHead from "../components/CustomHead";

import { Layout, Card, Image, Col, Row } from "antd";

const { Content } = Layout;
const { Meta } = Card;

import styles from "../styles/Main.module.css";

interface Props {
  posts: IPostFields[];
}

const Home: NextPage<Props> = ({ posts }) => {
  const url = (post: IPostFields) => `/${post?.slug}`;
  return (
    <>
      <CustomHead />
      <Layout className={styles.wrapper}>
        <div className={styles.title}>
          <h1>HUBBLE SPACE TELESCOPE</h1>
          <h4>Embark on a Journey of Discovery</h4>
        </div>
        <Content className={styles.content}>
          <Row justify="space-around">
            {posts.map((post) => (
              <Col lg={6} sm={12} key={post?.slug}>
                <Card
                  style={{ minHeight: 350 }}
                  cover={
                    <Image
                      src={post?.coverImage?.fields?.file?.url}
                      alt={post?.coverImage?.fields?.title}
                    />
                  }
                >
                  <Meta
                    title={<a href={url(post)}>{post?.title} &rarr;</a>}
                    description={post?.excerpt}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </Content>
        <CustomFooter />
      </Layout>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = (
    await ContentService.instance.getEntriesByType<IPostFields>("post")
  ).map((entry) => entry.fields);

  return {
    props: {
      posts,
    },
  };
};
