/// ====================
/// Puerto
/// ====================
process.env.PORT = process.env.PORT || 3000;

/// ====================
/// ENVIROMENT
/// ====================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/// ====================
/// Vencimiento Token
/// ====================
// 60 segundos * 60 minutos * 24 horas * 30 dias

process.env.CADUCIDAD_TOKEN = '48h';

/// ====================
/// AUTH SEED
/// ====================

process.env.SEED = process.env.SEED || 'este-es-el-secret-dev'

/// ====================
/// DATABASE
/// ====================

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cabanas';

} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;