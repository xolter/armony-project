import 'dotenv/config'
import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NODEJS_SERVER_API_GRAPHCMS;

export const projectList = async(req, res) => {

    const query = gql`
        query MyQuery {
            posts {
                title
                summary
                featuredImage {
                    url
                }
                featuredImage2 {
                    url
                }
            }
        }
    `;

    try {
        const data = await request(graphqlAPI, query);
        res.json(data);
    } catch (error) {
        console.log(error);
        res.json([]);
    }
}