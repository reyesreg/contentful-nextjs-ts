import type { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { useRouter } from "next/router";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Layout, PageHeader, Image } from "antd";

import { IPostFields } from "../src/@types/contentful";
import ContentService from "../src/util/content-service";
import CustomFooter from "../components/CustomFooter";
import CustomHead from "../components/CustomHead";

import styles from "../styles/Main.module.css";

const { Content } = Layout;

interface Props {
  post: IPostFields;
}

const Post: NextPage<Props> = ({ post }) => {
  const { title, content, coverImage, date } = post;
  const router = useRouter();
  return (
    <>
      <CustomHead />
      <Layout className={styles.wrapper}>
        <PageHeader
          onBack={() => router.push("/")}
          title="Hubblesite"
          subTitle="sample blog content"
        />
        <Content className={styles.content}>
          <div className={styles.title}>
            <h1>{title}</h1>
            <p>by {post?.author?.fields?.name}</p>
            <time dateTime={date}>{date}</time>
          </div>
          {documentToReactComponents(content)}
          <Image
            width={200}
            src={coverImage?.fields?.file?.url}
            alt={coverImage?.fields?.title}
          />
        </Content>
        <CustomFooter />
      </Layout>
    </>
  );
};

export default Post;

export const getStaticProps: GetStaticProps<Props, { slug: string }> = async (
  x
) => {
  const { slug } = x?.params!;
  const post = await ContentService.instance.getPostBySlug(slug);

  if (!post) {
    return { notFound: true };
  }

  return {
    props: {
      post: post?.fields,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await ContentService.instance.getEntriesByType<IPostFields>(
    "post"
  );

  return {
    paths: posts.map((post) => ({
      params: {
        slug: post?.fields?.slug,
      },
    })),
    fallback: false,
  };
};
