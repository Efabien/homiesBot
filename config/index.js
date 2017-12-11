module.exports = {
	token: process.env.FB_TOKEN_HOMIES,
	graphAPI: 'https://graph.facebook.com/v2.6',
	messengerProfile: 'https://graph.facebook.com/v2.6/me/messenger_profile',
	messengerAPI: 'https://graph.facebook.com/v2.6/me/messages',
	homiesApiBaseUrl: process.env.HOMIES_API,
	accessAPI: process.env.ACCESS_API,
	payloadMap: ['type', 'action', 'subaction', 'param', 'id'],
	payloadSeparator: '_'
}
