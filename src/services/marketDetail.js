import request from '@/utils/request';
export async function findUserDetailsById(param) {
  return request('/api/user/findUserDetailsById',{
    method:'get',
    params:param,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
  });
};