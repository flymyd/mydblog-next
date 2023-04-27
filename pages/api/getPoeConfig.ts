import type { NextApiRequest, NextApiResponse } from 'next'


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json({
    link: "https://sub.xeton.dev/sub?target=clash&new_name=true&url=https%3A%2F%2Fsub1.smallstrawberry.com%2Fapi%2Fv1%2Fclient%2Fsubscribe%3Ftoken%3Dcinwz9m1ciaue5h8pt8fue7ur4dfa8nq&insert=false&config=https%3A%2F%2Fraw.githubusercontent.com%2FACL4SSR%2FACL4SSR%2Fmaster%2FClash%2Fconfig%2FACL4SSR_Online.ini"
  })
}
