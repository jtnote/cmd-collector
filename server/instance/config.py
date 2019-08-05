# import redis

MYSQL_HOST = '127.0.0.1'
MYSQL_USER = 'root'
MYSQL_PASSWORD = '000133'
MYSQL_DB = 'cmd_notes'

# SESSION_TYPE = 'redis'  # session类型为redis
# SESSION_PERMANENT = False  # 如果设置为True，则关闭浏览器session就失效。
# SESSION_USE_SIGNER = False  # 是否对发送到浏览器上session的cookie值进行加密
# SESSION_KEY_PREFIX = 'session:'  # 保存到session中的值的前缀
# SESSION_REDIS = redis.Redis(host='127.0.0.1', port='6379')  
SECRET_KEY = 'ASDADASDSADASDSADSADASDSADASD'
# 用于连接redis的配置