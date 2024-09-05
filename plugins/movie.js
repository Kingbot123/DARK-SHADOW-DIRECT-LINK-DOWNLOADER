const axios = require('axios');
const { cmd } = require('../command');
const config = require('../config'); // Ensure your API key is in config

cmd({
    pattern: "info",
    desc: "Fetch detailed information about a movie.",
    category: "utility",
    react: "🎬",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const movieName = args.join(' ');
        if (!movieName) {
            return reply("📽 Please provide the name of the movie.");
        }

        // Appiriyai htta

        const apiUrl = `https://www.omdbapi.com/?t=${movieName}&apikey=af14c0c3`;
        // 

        
        // http://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=${config.OMDB_API_KEY}


        const response = await axios.get(apiUrl);

        const data = response.data;
        if (data.Response === "False") {
            return reply("🚫 Movie not found.");
        }
        // 🎬 Movie Information 🎬
        const movieInfo = `
🍃 𝗧ɪᴛʟᴇ : _${data.Title} Sinhala Subtitles | සිංහල උපසිරැසි සමඟ_

✤ *📆 𝗥ᴇʟᴇᴀꜱᴇᴅ :* ${data.Released}
✤ *🏅 𝗜ᴍᴅʙ 𝗩ᴏᴛᴇ :* ${data.imdbRating}
✤ *⏳ 𝗥ᴜɴᴛɪᴍᴇ :* ${data.Runtime}
✤ *🎭 𝗚ᴇɴʀᴇꜱ :* ${data.Genre}
✤ *🌍 𝗟ᴀɴɢᴜᴀɢᴇ :* ${data.Language}

`
;

        // Define the image URL
        const imageUrl = data.Poster && data.Poster !== 'N/A' ? data.Poster : config.ALIVE_IMG;

        // Send the movie information along with the poster image
    await conn.sendMessage(from, {
            image: { url: imageUrl },
            caption: `${movieInfo}\n> ᴄᴏʀᴅᴇᴅ ʙʏ ꜱᴀᴅᴇᴇᴘᴀ ᴄʜᴀᴍᴜᴅɪᴛʜ`
        }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply("   Error: " + e.message);
    }
});