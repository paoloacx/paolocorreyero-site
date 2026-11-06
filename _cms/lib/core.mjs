import {randomBytes,createCipheriv,createDecipheriv,createHash,timingSafeEqual} from 'node:crypto';
export const REPO='paoloacx/paolocorreyero-site',OWNER='paoloacx';
export function config(){for(const k of ['APP_URL','GITHUB_CLIENT_ID','GITHUB_CLIENT_SECRET','SESSION_SECRET'])if(!process.env[k])throw Error('Service not configured');if(!/^https:\/\/[^/]+$/.test(process.env.APP_URL)||process.env.SESSION_SECRET.length<48)throw Error('Invalid service configuration');return process.env}
export function cookie(req,name){return(req.headers.cookie||'').split('; ').find(x=>x.startsWith(name+'='))?.slice(name.length+1)}
const key=()=>createHash('sha256').update(config().SESSION_SECRET).digest();
export function seal(value){const iv=randomBytes(12),cipher=createCipheriv('aes-256-gcm',key(),iv),body=Buffer.concat([cipher.update(JSON.stringify(value)),cipher.final()]);return Buffer.concat([iv,cipher.getAuthTag(),body]).toString('base64url')}
export function unseal(value){try{const b=Buffer.from(value||'','base64url'),c=createDecipheriv('aes-256-gcm',key(),b.subarray(0,12));c.setAuthTag(b.subarray(12,28));const o=JSON.parse(Buffer.concat([c.update(b.subarray(28)),c.final()]));if(o.exp<Date.now())throw Error();return o}catch{throw Object.assign(Error('Inicia sesión de nuevo.'),{status:401})}}
export function setCookie(res,name,value,seconds){res.setHeader('Set-Cookie',`${name}=${value}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${seconds}`)}
export function harden(res){res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','no-referrer')}
export function auth(req){const session=unseal(cookie(req,'__Host-photo-session'));if(session.login!==OWNER)throw Object.assign(Error('Acceso no permitido.'),{status:403});return session}
export function writeGuard(req,s){if(req.headers.origin!==config().APP_URL||!req.headers['x-photo-csrf'])throw Object.assign(Error('Petición no válida.'),{status:403});const a=Buffer.from(req.headers['x-photo-csrf']),b=Buffer.from(s.csrf);if(a.length!==b.length||!timingSafeEqual(a,b))throw Object.assign(Error('Petición no válida.'),{status:403})}
export async function gh(token,path,method='GET',body){const r=await fetch('https://api.github.com'+path,{method,headers:{Authorization:'Bearer '+token,Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28','Content-Type':'application/json'},body:body===undefined?undefined:JSON.stringify(body)});if(!r.ok)throw Object.assign(Error(r.status===422||r.status===409?'La web ha cambiado. Recarga antes de publicar.':'GitHub no pudo completar la operación.'),{status:r.status===422||r.status===409?409:502});return r.status===204?null:r.json()}
export function sendError(res,e){res.status(e.status||500).json({error:e.status?e.message:'No se pudo completar la operación.'})}
export const nonce=()=>randomBytes(32).toString('base64url');
export const base='/repos/'+REPO;
export function validPath(p){return /^assets\/photos\/[a-f0-9-]{36}-(?:image|thumb)\.webp$/.test(p)}
