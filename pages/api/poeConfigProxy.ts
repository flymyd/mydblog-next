import type {NextApiRequest, NextApiResponse} from 'next'
import axios from "axios";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = "k036irxab720z10jxbmthqw6omixe64z"
  const link = `https://sub.xeton.dev/sub?target=clash&new_name=true&url=https%3A%2F%2Fsub1.smallstrawberry.com%2Fapi%2Fv1%2Fclient%2Fsubscribe%3Ftoken%3D${token}&insert=false&config=https%3A%2F%2Fraw.githubusercontent.com%2FACL4SSR%2FACL4SSR%2Fmaster%2FClash%2Fconfig%2FACL4SSR_Online.ini`
  axios.get(link, {}).then(resp => {
    res.status(200).json(resp.data)
  }).catch(err => {
    res.status(500).json({
      msg: 'INTERNAL SERVER ERROR'
    })
  })

}
