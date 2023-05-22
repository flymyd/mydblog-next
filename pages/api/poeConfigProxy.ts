import type {NextApiRequest, NextApiResponse} from 'next'
import axios from "axios";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const failCallback = () => res.status(500).json({
    msg: 'INTERNAL SERVER ERROR'
  })
  axios.get('https://gitee.com/flymyd/core-config/raw/master/config').then(config => {
    const token = config.data;
    // const link = `https://sub.xeton.dev/sub?target=clash&new_name=true&url=https%3A%2F%2Fsub1.smallstrawberry.com%2Fapi%2Fv1%2Fclient%2Fsubscribe%3Ftoken%3D${token}&insert=false&config=https%3A%2F%2Fraw.githubusercontent.com%2FACL4SSR%2FACL4SSR%2Fmaster%2FClash%2Fconfig%2FACL4SSR_Online.ini`
    const link = `https://sub.xeton.dev/sub?target=clash&new_name=true&url=https://www.paofusub2.com/link/x9KstObBYFn7DUdK?sub=1&insert=false&config=https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online.ini`
    axios.get(link, {}).then(resp => {
      res.status(200).json(resp.data)
    }).catch(err => {
      failCallback()
    })
  }).catch(err => {
    failCallback()
  })
}


