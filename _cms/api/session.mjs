import {auth,harden,sendError,setCookie,writeGuard} from '../lib/core.mjs';
export default function handler(req,res){harden(res);try{const s=auth(req);if(req.method==='DELETE'){writeGuard(req,s);setCookie(res,'__Host-photo-session','',0);return res.json({signedOut:true})}if(req.method!=='GET')return res.status(405).end();res.json({login:s.login,csrf:s.csrf})}catch(e){sendError(res,e)}}
