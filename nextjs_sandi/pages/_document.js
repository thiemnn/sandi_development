import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />         

          <link rel="stylesheet" href="/css/font-awesome.min.css" />
          <link rel="stylesheet" href="/css/meanmenu.css" />
          <link rel="stylesheet" href="/css/nice-select.css" />
          <link rel="stylesheet" href="/css/bootstrap.min.css" />
          <link rel="stylesheet" href="/css/slick.css" />
          <link rel="stylesheet" href="/css/animate.css" />
          <link rel="stylesheet" href="/css/owl.carousel.min.css" />
          <link rel="stylesheet" href="/css/helper.css" />
          <link rel="stylesheet" href="/style.css" />
          <link rel="stylesheet" href="/css/responsive.css"></link>
        </Head>
        <body>
          <Main />
          <NextScript />
          <script src="/js/vendor/jquery-1.12.4.min.js"></script>
          <script src="/js/jquery.meanmenu.min.js"></script>
          <script src="/js/bootstrap.js"></script>
          <script src="/js/bootstrap.min.js"></script>
          <script src="/js/jquery-ui.min.js"></script>
          <script src="/js/jquery.nice-select.min.js"></script>
          <script src="/js/slick.min.js"></script>
          <script src="/js/owl.carousel.min.js"></script>
          <script src="/js/main_dev.js"></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
