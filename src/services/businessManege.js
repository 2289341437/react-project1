import request from '@/utils/request';
export async function queryBusinessManege(param) {
  return request('/api/busines/pageQuery',{
    method:'get',
    params:param,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
  });
};