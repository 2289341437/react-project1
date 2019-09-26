import request from '@/utils/request';
export async function queryMarket(param) {
  return request('/api/user/pageQuery',{
    method:'get',
    params:param,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
  });
};
export async function saveOrUpdateMarket(param) {
  return request('/api/user/saveOrUpdate',{
    method:'post',
    params:param,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
  });
};
export async function findUserDetailsById(param) {
  return request('/api/user/findUserDetailsById',{
    method:'get',
    params:param,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
  });
};