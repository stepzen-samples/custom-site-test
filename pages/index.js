import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/light-blue.png";
import styles from "../styles/Home.module.css";
import useSWR from "swr";

// fetcher function to enable use of SWR
const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
};

export default function Home() {
  const { data, error } = useSWR("/api/stepzen_fetch", fetcher);

  if (error) return <div>{error.message}</div>;
  if (!data) return <div>Loading...</div>;

  //page to render if tweet fetch goes awry
  if (
    data.data.data.devto_getArticles[0].user.twitter_details.pinned_tweet ===
    null
  ) {
    return (
      <div className={styles.container}>
        <Head>
          <title>StepZen Portfolio Site</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            <a href="https://stepzen.com/"></a> Hi, I&aposm{" "}
            {data.data.data.devto_getArticles[0].user.username}! Here&aposs some
            of my code and content that I create.
          </h1>

          <div className={styles.grid}>
            <a
              href={`https://dev.to/${data.data.data.devto_getArticles[0].user.username}`}
              className={styles.card}
            >
              <h2>Top 3 DEV.to articles &rarr;</h2>
              <p> - {data.data.data.devto_getArticles[0].title} </p>
              <p> - {data.data.data.devto_getArticles[1].title} </p>
              <p> - {data.data.data.devto_getArticles[2].title} </p>
            </a>

            <a
              href={`https://github.com/${data.data.data.devto_getArticles[0].user.github_username}`}
              className={styles.card}
            >
              <h2>Top Pinned Github Repos &rarr;</h2>
              <p>
                Name:{" "}
                {
                  data.data.data.devto_getArticles[0].user.github_details
                    .pinnedItems.nodes[0].name
                }
                Description:{" "}
                {
                  data.data.data.devto_getArticles[0].user.github_details
                    .pinnedItems.nodes[0].description
                }
              </p>
              <p>
                Name:{" "}
                {
                  data.data.data.devto_getArticles[0].user.github_details
                    .pinnedItems.nodes[1].name
                }
                Description:{" "}
                {
                  data.data.data.devto_getArticles[0].user.github_details
                    .pinnedItems.nodes[1].description
                }
              </p>
            </a>

            <a
              href={`https://twitter.com/${data.data.data.devto_getArticles[0].user.twitter_username}`}
              className={styles.card}
            >
              <h2>Pinned Tweet &rarr;</h2>
              <p>No pinned tweet, possible key error.</p>
            </a>

            <a href="#" className={styles.card}>
              <h2>Deploy &rarr;</h2>
              <p>
                Instantly deploy your custom dynamic site with Netlify by
                clicking this button.
              </p>
            </a>
          </div>
        </main>

        <footer className={styles.footer}></footer>
      </div>
    );

    //page to render if github fetch goes awry
  } else if (
    data.data.data.devto_getArticles[0].user.github_details.pinnedItems.nodes[0]
      .name === null
  ) {
    return (
      <div className={styles.container}>
        <Head>
          <title>StepZen x Netlify x Next</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            {" "}
            <a href="https://stepzen.com/"> </a> Hi, I&aposm{" "}
            {data.data.data.devto_getArticles[0].user.username}! Here&aposs some
            of my code and content that I create.
          </h1>
          <div className={styles.grid}>
            <a
              href={`https://dev.to/${data.data.data.devto_getArticles[0].user.username}`}
              className={styles.card}
            >
              <h2>Top 3 DEV.to articles &rarr;</h2>
              <p> - {data.data.data.devto_getArticles[0].title} </p>
              <p> - {data.data.data.devto_getArticles[1].title} </p>
              <p> - {data.data.data.devto_getArticles[2].title} </p>
            </a>

            <a
              href={`https://github.com/${data.data.data.devto_getArticles[0].user.github_username}`}
              passHref
              className={styles.card}
            >
              <h2>Top Pinned Github Repos &rarr;</h2>
              <p>No pinned repos to be found, possible key error.</p>
            </a>

            <a
              href={`https://twitter.com/${data.data.data.devto_getArticles[0].user.twitter_username}`}
              className={styles.card}
            >
              <h2>Pinned Tweet &rarr;</h2>
              <p>
                {" "}
                {
                  data.data.data.devto_getArticles[0].user.twitter_details
                    .pinned_tweet.text
                }
              </p>
            </a>

            <a href="#" className={styles.card}>
              <h2>Deploy &rarr;</h2>
              <p>
                Instantly deploy your custom dynamic site with Netlify by
                clicking this button.
              </p>
            </a>
          </div>
        </main>

        <footer className={styles.footer}></footer>
      </div>
    );
  }

  //page to render if devto fetch goes awry
  if (data.data.data.devto_getArticles[0].user === undefined) {
    return <div>No devto user found under that name</div>;

    //page to render when things go well
  } else {
    return (
      <div className={styles.container}>
        <Head>
          <title>StepZen Portfolio Site</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            {" "}
            {data.data.data.devto_getArticles[0].user.username}&#39;s custom
            portfolio
          </h1>

          <div className={styles.grid}>
            <a
              href={`https://dev.to/${data.data.data.devto_getArticles[0].user.username}`}
              className={styles.card}
            >
              <h2>Top 3 DEV.to articles &rarr;</h2>
              <p> - {data.data.data.devto_getArticles[0].title} </p>
              <p> - {data.data.data.devto_getArticles[1].title} </p>
              <p> - {data.data.data.devto_getArticles[2].title} </p>
            </a>

            <a
              href={`https://github.com/${data.data.data.devto_getArticles[0].user.github_username}`}
              passHref
              className={styles.card}
            >
              <h2>Top Pinned Github Repos &rarr;</h2>
              <p>
                Name:{" "}
                {
                  data.data.data.devto_getArticles[0].user.github_details
                    .pinnedItems.nodes[0].name
                }
                Description:{" "}
                {
                  data.data.data.devto_getArticles[0].user.github_details
                    .pinnedItems.nodes[0].description
                }{" "}
              </p>
              <p>
                {" "}
                Name:{" "}
                {
                  data.data.data.devto_getArticles[0].user.github_details
                    .pinnedItems.nodes[1].name
                }
              </p>
              <p>
                Description:{" "}
                {
                  data.data.data.devto_getArticles[0].user.github_details
                    .pinnedItems.nodes[1].description
                }
              </p>
            </a>

            <a
              href={`https://twitter.com/${data.data.data.devto_getArticles[0].user.twitter_username}`}
              className={styles.card}
            >
              <h2>Pinned Tweet &rarr;</h2>
              <p>
                {" "}
                {
                  data.data.data.devto_getArticles[0].user.twitter_details
                    .pinned_tweet.text
                }
              </p>
            </a>
          </div>
          <p className={styles.sub_headline}>
            powered by <a href="https://stepzen.com/">StepZen</a> and{" "}
            <a href="https://www.netlify.com/">Netlify </a>
          </p>
        </main>

        <footer className={styles.footer}></footer>
      </div>
    );
  }
}
