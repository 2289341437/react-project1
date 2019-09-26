import request from '@/utils/request';
export async function queryShopManege(param) {
  return request('/api/store/pageQuery',{
    method:'get',
    params:param,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
  });
};