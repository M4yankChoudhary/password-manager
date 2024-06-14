from pymongo import MongoClient
from dotenv import load_dotenv
load_dotenv()

DATABASE_URL = os.environ["DATABASE_URL"]

# Here I am setting up the mongodb client
client = MongoClient(DATABASE_URL)
db = client['passwordManager']

# MongoDB collections
users_colletion = ['users']
vault_colletion = ['vaults']
passwords_colletion = ['passwords']