import BASE_URL from "../constants/textUtility/textenv";
const generateSiteMap = (data, origin) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${origin}</loc>
    </url>
    <url>
      <loc>${origin}/product-list</loc>
    </url>
    <url>
      <loc>${origin}/categorie-listing</loc>
    </url>
    <url>
      <loc>${origin}/search-products</loc>
    </url>
    <url>
      <loc>${origin}/whishlist</loc>
    </url>
    <url>
      <loc>${origin}/my-cart</loc>
    </url>${data
      ?.map((item) => {
        return `<url>
        <loc>
          ${origin}/product-details/${item?.slug}
        </loc>
      </url>`;
      })
      .join("")}
  </urlset>
  `;
};

function SiteMap() {}

export const getServerSideProps = async ({ req, res }) => {
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const host = req.headers.host;
  const origin = `${"https"}://${host}`;

  const url = "https://apis.zlite.in/store/api/v1/product-slug";

  const requestOptions = {
    headers: {
      Origin: host?.split(".")?.at(0),
    },
  };

  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    const { products } = data;

    const sitemap = generateSiteMap(products, origin);
    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();
    return {
      props: {
        products,
      },
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      props: {
        error: "Error occurred while fetching data from the API.",
      },
    };
  }
};

export default SiteMap;
