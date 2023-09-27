const express = require('express');
const app = express();
app.get('/', (req, res) => {
  res.send('Hello Express app!')
});
app.listen(3000, () => {
});

const { Client, Intents, GatewayIntentBits } = require('discord.js');
const Discord = require("discord.js");
const client = new Discord.Client({
  intents: [
     Discord.Intents.FLAGS.GUILDS,
     Discord.Intents.FLAGS.GUILD_MESSAGES
  ]
});

client.on('ready', () => {
    console.log(`Bot is On! ${client.user.tag}`);
})

client.setMaxListeners(1000); // حدد الحد الذي تحتاجه

client.on("ready", () =>{
console.log(`${client.user.username} is Online `)
  console.log(``)
  console.log(`Bot Name : ${client.user.username}`)
  console.log(`Bot Tag : ${client.user.tag}`)
  console.log(`Bot Id : ${client.user.id}`)
  console.log(`Servers Count : ${client.guilds.cache.size}`)
  console.log(`Channels : ${client.channels.cache.size}`);
  console.log(`Users Count : ${client.guilds.cache
.reduce((a, b) => a + b.memberCount, 0)
.toLocaleString()}`)
  console.log(``)
})


const prefix = '!'

///--------------------------------------------------------------///
client.on('guildDelete', async(guild) => {
  let room = '1020937024921935929'; 

  let newserver = new Discord.MessageEmbed()
    .setTitle(`Left Server`)
		.setDescription(`
> **User Link:** [Click](https://discord.com/users/${guild.ownerId})

> **Server Name: ${guild.name}**

> **Server ID: ${guild.id}**

> **Created At: ${guild.createdAt.toUTCString()} **
 
> **Owner: <@${guild.ownerId}>**

> **Members: ${guild.memberCount}**

> **Verification Level:${guild.verificationLevel}**

`)
  .setColor(`#ff0000`)
  let channel = await client.channels.cache.get(room)
    channel.send({embeds: [newserver]})});
   
 



///--------------------------------------------------------------///

client.on('guildCreate', async(guild) => {
  let room = '1020937024921935929'; 
const invite = await guild.invites.create(guild.channels.cache.filter(c => c.type === 'GUILD_TEXT').first().id);


  let newserver = new Discord.MessageEmbed()
    .setTitle(`New Server`) .setDescription(`
> **User Link:** [Click](https://discord.com/users/${guild.ownerId})

> **Server Link:** [Join](${invite})

> **Server Name: ${guild.name}**

> **Server ID: ${guild.id}**

 > **Created At: ${guild.createdAt.toUTCString()} **
 
> **Owner: <@${guild.ownerId}>**

> **Members: ${guild.memberCount}**

 > **Text Channels: ${guild.channels.cache.filter(channel => channel.type === 'GUILD_TEXT').size} **
 
> **Voice Channels: ${guild.channels.cache.filter(channel => channel.type === 'GUILD_VOICE').size} **

> **Verification Level:${guild.verificationLevel}**

`)
  .setColor(`#4a4a4a`)
  let channel = await client.channels.cache.get(room)
    channel.send({embeds: [newserver]})});
///--------------------------------------------------------------///

///------------------- Public Commands --------------------------///

///--------------------------------------------------------------///

client.on('messageCreate', (message) => {
  if (message.content.startsWith(prefix + 'icon')) {
    const serverIcon = message.guild.iconURL();

    const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setTitle(`${message.guild.name} Server`)
      .setDescription(`[Icon Link](${serverIcon})`)
      .setImage(serverIcon)
      .setTimestamp()
      .setFooter(`Requested by : ${message.author.username}`, {
        iconURL: message.author.avatarURL({ dynamic: true }),
      });

    message.reply({ embeds: [embed] });
  }
});


///--------------------------------------------------------------///

client.on('messageCreate', (message) => {
  if (message.content.startsWith(prefix + 'time')) {
    const currentDate = new Date();
    const time = `${currentDate.toLocaleTimeString()} ${currentDate.toLocaleDateString()}`;

    const embed = new MessageEmbed()
      .setColor('black')
      .setTimestamp()
      .setThumbnail(message.author.avatarURL())
      .setAuthor(message.guild.name, message.guild.iconURL())
      .setFooter(`Requested by ${message.author.username}`, {
        iconURL: message.author.avatarURL({ dynamic: true }),
      })
      .setDescription(
        `> ・**__Today__** : **${currentDate.toLocaleDateString()}**
        > ・**__Hour__** : **${currentDate.toLocaleTimeString()}**`
      );

    message.reply({ embeds: [embed] });
  }
});






///--------------------------------------------------------------///


const translate = require('@iamtraction/google-translate');


client.on('messageCreate', async (message) => {
  if (message.author.bot || !message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'translate') {

    if (args.length < 2) {
      return message.reply(`Usage: ${prefix}translate <language> <text>`);
    }

    const language = args[0];
    const text = args.slice(1).join(' ');

    try {
      const translation = await translate(text, { to: language });
      
      
      const embed = new MessageEmbed()
        .setTitle(`Translation to __${language}__`)
        .setDescription(`**Normal Text :**\n\n> __${text}__\n\n **Translated Text :**\n\n> __${translation.text}__`)
        .setColor('black');

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      message.reply('An error occurred while translating the text.');
    }
  }
});
///--------------------------------------------------------------///

client.on('messageCreate', async message => {
    if (message.content.startsWith (prefix + "listinvite")) {
    const invites = await message.guild.invites.fetch();
    const embed = new MessageEmbed()
      .setTitle('list of Invites')
      .setColor('black');
    invites.each(invite => {
      embed.addField(`${invite.url} ⤵`, `\`\`\`Created by: ${invite.inviter.username}\nExpires in: ${invite.expiresAt ? invite.expiresAt.toLocaleString() : 'Never'}\`\`\``);
      });
    message.channel.send({ embeds: [embed] });
  }
});

///--------------------------------------------------------------///


client.on('messageCreate', (message) => {
  if (message.content.startsWith(prefix + 'ping')) {
    const embed = new MessageEmbed()
      .setColor('RANDOM')
      .setThumbnail('') // قم بوضع رابط صورة البوت أو أي صورة تفضل
      .setTitle('Ping 📈')
      .setDescription(`My ping is: **${client.ws.ping}** ms. 📈`)
      .setFooter(`Requested by: ${message.author.username}`, {
        iconURL: message.author.avatarURL({ dynamic: true }),
      })
      .setTimestamp();

    message.reply({ embeds: [embed] });
  }
});


///--------------------------------------------------------------///

client.on('messageCreate', message => {
  if (!message.content.startsWith(prefix + 'avatar')) return;

  const user = message.mentions.users.first() || message.author;
  const avatarURL = user.displayAvatarURL({ size: 2048, format: 'png', dynamic: true });

  const embed = new MessageEmbed()
    .setColor(`black`)
    .setAuthor(user.tag, avatarURL)
    .setFooter(`Requested by ${message.author.username}`, "https://cdn.discordapp.com/icons/859456754156699648/1a9dc5e3e91b09d9d1097f2fcc95e612.webp?size=2048")
    .setDescription(`[Avatar Link](${avatarURL})`)
    .setImage(avatarURL);

  message.channel.send({ embeds: [embed] });
});


client.on('messageCreate', message => {
  if (!message.content.startsWith(prefix + 'user')) return;

  const user = message.mentions.users.first() || message.author;
  const member = message.guild.members.cache.get(user.id); // تغيير هنا

  if (!member) return; // تحقق من وجود العضو

  const highestRole = member.roles.highest;

  const embed = new MessageEmbed()
    .setColor(`black`)
    .setTimestamp()
    .setFooter(`Requested by : ${message.author.username}`, message.author.avatarURL())
    .setThumbnail(user.avatarURL())
    .setAuthor(`${user.username}'s information`, 'https://cdn.discordapp.com/avatars/1083361124973563924/611bbd060cc5ad9f2e3f061db22b7f6b.png?size=2048')
    .addFields({ name: "> | Username", value: `> ${user.username}`})
    .addFields({ name: "> | ID", value: `> ${user.id}`})
    .addFields({ name: "> | Joined Server", value: `> <t:${Math.floor(member.joinedAt / 1000)}:R>`}) // تغيير هنا
    .addFields({ name: "> | Joined Discord", value: `> <t:${Math.floor(user.createdTimestamp / 1000)}:R>`}) // تغيير هنا
    .addFields({ name: '> | Highest Role:', value: `> ${highestRole}`});

  message.reply({ embeds: [embed] });
});

///--------------------------------------------------------------///

client.on('messageCreate', (message) => {
  if (message.content.startsWith(prefix + 'server')) {
    const server = message.guild;
    const serverId = server.id;
    const serverCreated = Math.floor(+new Date(server.createdTimestamp / 1000));
    const serverOwnerId = server.ownerId;
    const serverMembers = server.members.cache;
    const serverBoosts = server.premiumSubscriptionCount;
    const serverChannels = server.channels.cache;
    const serverChannelsText = serverChannels.filter((channel) => channel.type === 'GUILD_TEXT');
    const serverChannelsVoice = serverChannels.filter((channel) => channel.type === 'GUILD_VOICE');
    const serverVerificationLevel = server.verificationLevel;
    const serverRoles = server.roles.cache;

    const embed = new MessageEmbed()
      .setColor('#000000')
      .setAuthor({ name: server.name, iconURL: server.iconURL() })
      .setThumbnail(server.iconURL())
      .addFields(
        { name: ':id: Server ID:', value: `${serverId}`, inline: true },
        { name: ':calendar: Created On', value: `**<t:${serverCreated}:R>**`, inline: true },
        { name: ':crown: Owned by', value: `<@${serverOwnerId}>`, inline: true },
        {
          name: `:busts_in_silhouette:  Members (${serverMembers.size})`,
          value: `**${serverMembers.filter((user) => user.presence?.status).size}** Online\n**${serverBoosts}** Boosts :sparkles:`,
          inline: true,
        },
        {
          name: `:speech_balloon: Channels (${serverChannels.size})`,
          value: `**${serverChannelsText.size}** Text | **${serverChannelsVoice.size}** Voice`,
          inline: true,
        },
        { name: `:earth_africa: Others`, value: `**Verification Level:** ${serverVerificationLevel}`, inline: true },
        { name: `:closed_lock_with_key:  Roles (${serverRoles.size})`, value: 'To see a list with all roles use **/roles**', inline: true }
      );

    message.channel.send({ embeds: [embed] });
  }
});

///--------------------------------------------------------------///

client.on('messageCreate', (message) => {
  if (
    message.content === prefix + 'ROLES' ||
    message.content === prefix + 'Roles' ||
    message.content === prefix + 'roles'
  ) {
    const roles = message.guild.roles.cache;
    const embed = new MessageEmbed()
      .setColor(`black`)
.setTitle('> Server Roles', { iconURL: null }) // قد ترغب في ترك iconURL كما هو إذا كان لديك رابط أيقونة الخادم
      .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL() })
      .setTimestamp()
      .setFooter({ text: `Requested by : ${message.author.username}`, iconURL: message.author.avatarURL() }) // تم تحديث هذا السطر
      .setDescription('');

    roles.forEach((role) => {
      embed.addField(role.name, role.id, true);
    });

    message.channel.send({ embeds: [embed] });
  }
});

///--------------------------------------------------------------///

client.on('messageCreate', async (message) => {
  if (
    message.content === prefix + 'link' ||
    message.content === prefix + 'LINK' ||
    message.content === prefix + 'Link'
  ) {
    const channelWithInvitePermission = message.guild.channels.cache
      .filter((c) => c.permissionsFor(client.user).has('CREATE_INSTANT_INVITE'))
      .sort((a, b) => a.position - b.position)
      .first();

    if (!channelWithInvitePermission) {
      message.channel.send('I cannot create an invite in any channel.');
      return;
    }

    try {
      const invite = await channelWithInvitePermission.createInvite({ maxAge: 0, unique: false });
      message.channel.send(`> **${message.guild.name} Server Link**\n> ${invite.url}`);
    } catch (error) {
      console.error(error);
      message.channel.send('An error occurred while creating the invite.');
    }
  }
});

///--------------------------------------------------------------///

///------------------- Public Commands --------------------------///

///--------------------------------------------------------------///

///--------------------------------------------------------------///

///-------------------- Admin Commands --------------------------///

///--------------------------------------------------------------///

client.on('messageCreate', async (message) => {
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === 'ban') {
    // تحقق مما إذا تم الإشارة إلى مستخدم لحظره
    const user = message.mentions.users.first();
    if (!user) {
      return message.reply('**Please Mention user or Type the user ID/Username :x:**');
    }

    // حظر المستخدم المحدد
    try {
      const member = await message.guild.members.ban(user);
      message.reply(`**:white_check_mark: ${member.user.tag} banned from the server! :airplane:**`);
    } catch (error) {
      console.error(error);
      message.reply('حدث خطأ أثناء محاولة الحظر!');
    }
  } else if (command === 'unban') {
    // تحقق مما إذا تم إلغاء الحظر
    const userId = args[0];
    if (!userId) {
      return message.reply('**Please provide the user ID to unban :x:**');
    }

    // إلغاء حظر المستخدم بواسطة الـ ID
    try {
      const bannedUsers = await message.guild.bans.fetch();
      const user = bannedUsers.get(userId);

      if (!user) {
        return message.reply('**User not found in the ban list :x:**');
      }

      await message.guild.bans.remove(user);
      message.reply(`**:white_check_mark: ${user.tag} has been unbanned from the server! :unlock:**`);
    } catch (error) {
      console.error(error);
      message.reply('حدث خطأ أثناء محاولة إلغاء الحظر!');
    }
  }
});

///--------------------------------------------------------------///

client.on('messageCreate', async (message) => {
  if (message.content === prefix + 'HIDE' || message.content === prefix + 'hide') {
    if (message.author.bot || !message.guild) return;
    if (!message.member.permissions.has('MANAGE_CHANNELS')) {
      return message.reply(' ** You dont have `MANAGE_CHANNELS` permission **');
    }
    
    const everyone = message.guild.roles.cache.find((role) => role.name === '@everyone');
    
    // قم بإنشاء الإعدادات الجديدة للقناة
    const channelPermissions = [
      {
        id: everyone.id,
        deny: ['VIEW_CHANNEL'],
      },
    ];

    try {
      await message.channel.permissionOverwrites.edit(everyone, {
        VIEW_CHANNEL: false,
      });

      const embed = new MessageEmbed()
        .setColor('black')
        .setThumbnail(message.guild.iconURL())
        .setDescription(`> **Done Hide This Room ${message.channel}**`)
        .setFooter(`By ${message.author.username}`);

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      message.reply('حدث خطأ أثناء محاولة إخفاء القناة!');
    }
  }
});

///--------------------------------------------------------------///

client.on('messageCreate', async (message) => {
  if (message.content === prefix + 'show' || message.content === prefix + 'Show') {
    if (message.author.bot || !message.guild) return;
    if (!message.member.permissions.has('MANAGE_CHANNELS')) {
      return message.reply(' ** You dont have `MANAGE_CHANNELS` permission **');
    }
    
    const everyone = message.guild.roles.cache.find((role) => role.name === '@everyone');
    
    // قم بإنشاء الإعدادات الجديدة للقناة
    const channelPermissions = [
      {
        id: everyone.id,
        allow: ['VIEW_CHANNEL'],
      },
    ];

    try {
      await message.channel.permissionOverwrites.edit(everyone, {
        VIEW_CHANNEL: true,
      });

      const embed = new MessageEmbed()
        .setColor('black')
        .setThumbnail(message.guild.iconURL())
        .setDescription(`> **Done Show This Room ${message.channel}**`)
        .setFooter(`By ${message.author.username}`);

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      message.reply('حدث خطأ أثناء محاولة إظهار القناة!');
    }
  }
});


///--------------------------------------------------------------///

client.on('messageCreate', async (message) => {
  if (message.content === prefix + 'lock' || message.content === prefix + 'LOCK') {
    if (!message.member.permissions.has('MANAGE_CHANNELS')) {
      return message.channel.send('>>> \`\`\`You Don\'t have the permission : \`\`\` \n\n **\`MANAGE_CHANNELS\`**');
    }
    
    let channel = message.mentions.channels.first() || message.channel;
    
    try {
      await channel.permissionOverwrites.edit(message.guild.id, {
        SEND_MESSAGES: false,
      });

      const embed = new MessageEmbed()
        .setColor('black')
        .setDescription(`> 🔒 **__| Done Locked #${channel.name}__**`);

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      message.reply('حدث خطأ أثناء محاولة قفل القناة!');
    }
  }
});


///--------------------------------------------------------------///

client.on('messageCreate', async (message) => {
  if (message.content === prefix + 'unlock' || message.content === prefix + 'UNLOCK') {
    if (!message.member.permissions.has('MANAGE_CHANNELS')) {
      return message.channel.send('>>> \`\`\`You Don\'t have the permission : \`\`\` \n\n **\`MANAGE_CHANNELS\`**');
    }
    
    let channel = message.mentions.channels.first() || message.channel;
    
    try {
      await channel.permissionOverwrites.edit(message.guild.id, {
        SEND_MESSAGES: true,
      });

      const embed = new MessageEmbed()
        .setColor('black')
        .setDescription(`> 🔓 **__| Done Unlocked #${channel.name}__**`);

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      message.reply('حدث خطأ أثناء محاولة فتح القناة!');
    }
  }
});


///--------------------------------------------------------------///

///-------------------- Games Commands --------------------------///

///--------------------------------------------------------------///

client.on("messageCreate", async (message) => {
  if (
    message.content === prefix + "fast" ||
    message.content === prefix + "أسرع"
  ) {
    const f = [
      "زومبي",
      "قسطنطينة",
      "حبيبي والله",
      "صراع",
      "مشروع",
      "مثلث",
      "رفرف",
      "الشعر",
      "خنق",
      "لقب",
      "إخفاء",
      "بائع",
      "ثؤلول",
      "فينوس",
      "سلالة",
      "برميل",
      "حب",
      "معدن",
      "تمام",
      "كبسولة",
      "الخيل",
    ];
    let fast = Math.floor(Math.random() * f.length);
    const embed = new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.avatarURL())
      .setColor(`black`)
      .setDescription(`\`\`\`${f[fast]}\`\`\``)
      .setFooter("You Have 15 Seconds")
      .setTimestamp();
    message.channel.send({ embeds: [embed] });

    const filter = (m) => m.content.includes(f[fast]);
    message.channel
      .awaitMessages({
        filter,
        max: 1,
        time: 15000,
        errors: ["time"],
      })
      .then((collected) => {
        const winnerEmbed = new Discord.MessageEmbed()
          .setColor("50eb02")
          .setDescription(`✅ **| <@${collected.first().author.id}> Congratulations you are the winner!**`);
        message.channel.send({ embeds: [winnerEmbed] });
      })
      .catch(() => {
        const timeOverEmbed = new Discord.MessageEmbed()
          .setColor("RED")
          .setDescription(`🕘 **| Time is Over, No One Won.**`);
        message.channel.send({ embeds: [timeOverEmbed] });
      });
  }
	
});


///--------------------------------------------------------------///

client.on("messageCreate", async (message) => {
  if (
    message.content === prefix + "fkk" ||
    message.content === prefix + "فكك"
  ) {
    const f = [
      "> ** زومبي**",
      "> ** قسطنطينية**",
      "> **حبيبي والله**",
      "> **صراع**",
      "> **مشروع**",
      "> **مثلث**",
      "> **رفرف**",
      "> **الشعر**",
      "> **خنق**",
      "> **لقب**",
      "> **إخفاء**",
      "> **بائع**",
      "> **ثؤلول**",
      "> **فينوس**",
      "> **سلالة**",
      "> **برميل**",
      "> **حب**",
      "> **معدن**",
      "> **تمام**",
      "> **كبسولة**",
      "> **الخيل**",
      "> **الماضي**",
      "> **المستقبل**",
      "> **ساعه**",
      "> **يتاذي**",
      "> **نايم**",
      "> **وقت**",
      "> **طاوله**",
      "> **مشهور**",
      "> **عمل**",
      "> **وجهك**",
    ];

    const fk = [
      "ز و م ب ي",
      "ق س ط ن ط ي ن ة",
      "ح ب ي ب ي و ا ل ل ه",
      "ص ر ا ع",
      "م ش ر و ع",
      "م ث ل ث",
      "ر ف ر ف",
      "ا ل ش ع ر",
      "خ ن ق",
      "ل ق ب",
      "إ خ ف ا ء",
      "ب ا ئ ع",
      "ث ؤ ل و ل",
      "ف ي ن و س",
      "س ل ا ل ة",
      "ب ر م ي ل",
      "ح ب",
      "م ع د ن",
      "ت م ا م",
      "ك ب س و ل ة",
      "ا ل خ ي ل",
      "ا ل م ا ض ي",
      "ال م س ت ق ب ل",
      "س ا ع ه",
      "ي ت ا ذ ي",
      "ن ا ي م",
      "و ق ت",
      "ط ا و ل ه",
      "م ش ه و ر",
      "ع م ل",
      "و ج ه ك",
    ];
  
    let fkk = Math.floor(Math.random() * f.length);
    const embed = new MessageEmbed()
      .setAuthor(message.author.username, message.author.avatarURL())
      .setColor(`black`)
      .setDescription(f[fkk])
      .setFooter("You Have 15 Seconds")
      .setTimestamp();
    const sentMessage = await message.channel.send({ embeds: [embed] });

    const filter = (m) => m.content.includes(fk[fkk]);
    message.channel
      .awaitMessages({
        filter,
        max: 1,
        time: 15000,
        errors: ["time"],
      })
      .then((collected) => {
        const winnerEmbed = new MessageEmbed()
          .setColor("50eb02")
          .setDescription(`✅ **| <@${collected.first().author.id}> Congratulations you are the winner!**`);
        sentMessage.edit({ embeds: [winnerEmbed] });
      })
      .catch(() => {
        const timeOverEmbed = new MessageEmbed()
          .setColor("RED")
          .setDescription(`🕘 **| Time is Over, No One Won.**`);
        sentMessage.edit({ embeds: [timeOverEmbed] });
      });
  }
});

///--------------------------------------------------------------///

client.on("messageCreate", async (message) => {
  if (
    message.content === prefix + "gm3" ||
    message.content === prefix + "جمع"
  ) {
    const g = [
      "ز و م ب ي",
      "ق س ط ن ط ي ن ة",
      "ح ب ي ب ي و ا ل ل ه",
      "ص ر ا ع",
      "م ش ر و ع",
      "م ث ل ث",
      "ر ف ر ف",
      "ا ل ش ع ر",
      "خ ن ق",
      "ل ق ب",
      "إ خ ف ا ء",
      "ب ا ئ ع",
      "ث ؤ ل و ل",
      "ف ي ن و س",
      "س ل ا ل ة",
      "ب ر م ي ل",
      "ح ب",
      "م ع د ن",
      "ت م ا م",
      "ك ب س و ل ة",
      "ا ل خ ي ل",
      "ا ل م ا ض ي",
      "ال م س ت ق ب ل",
      "س ا ع ه",
      "ي ت ا ذ ي",
      "ن ا ي م",
      "و ق ت",
      "ط ا و ل ه",
      "م ش ه و ر",
      "ع م ل",
      "و ج ه ك",
    ];
  
    const gm = [
      "زومبي",
      "قسطنطينة",
      "حبيبي والله",
      "صراع",
      "مشروع",
      "مثلث",
      "رفرف",
      "الشعر",
      "خنق",
      "لقب",
      "إخفاء",
      "بائع",
      "ثؤلول",
      "فينوس",
      "سلالة",
      "برميل",
      "حب",
      "معدن",
      "تمام",
      "كبسولة",
      "الخيل",
      "الماضي",
      "المستقبل",
      "ساعه",
      "يتاذي",
      "نايم",
      "وقت",
      "طاوله",
      "مشهور",
      "عمل",
    ];
  
    let gm3 = Math.floor(Math.random() * g.length);
    const embed = new MessageEmbed()
      .setColor(`black`)
      .setAuthor(message.author.username, message.author.avatarURL())
      .setDescription(`\`\`\`${g[gm3]}\`\`\``)
      .setFooter("You Have 15 Seconds")
      .setTimestamp();
    const sentMessage = await message.channel.send({ embeds: [embed] });
  
    const filter = (m) => m.content.includes(gm[gm3]);
    message.channel
      .awaitMessages({
        filter,
        max: 1,
        time: 15000,
        errors: ["time"],
      })
      .then((collected) => {
        const winnerEmbed = new MessageEmbed()
          .setColor("50eb02")
          .setDescription(`✅ **| <@${collected.first().author.id}> Congratulations you are the winner!**`);
        sentMessage.edit({ embeds: [winnerEmbed] });
      })
      .catch(() => {
        const timeOverEmbed = new MessageEmbed()
          .setColor("fa0606")
          .setDescription(`🕘 **| Time is Over, No One Won.**`);
        sentMessage.edit({ embeds: [timeOverEmbed] });
      });
  }
});

///--------------------------------------------------------------///

client.on("messageCreate", async (message) => {
  if (
    message.content === prefix + "flags" ||
    message.content === prefix + "اعلام"
  ) {
    const a = [
      "https://cdn.discordapp.com/attachments/961240264763133952/1149471385522032691/EAFB662F-23AD-432D-B5D8-8816C7A967B5.jpg",
      "https://cdn.discordapp.com/attachments/961240264763133952/1149471874200375326/D4296B81-123A-4CF1-AD00-22BD5D167459.jpg",
      "https://cdn.discordapp.com/attachments/961240264763133952/1149472228379996200/6CE13E27-FF5E-4068-ACEE-4AB5472CCFC7.jpg",
      "https://cdn.discordapp.com/attachments/961240264763133952/1149472535876993115/4A96541E-90EA-4996-9FA7-14BA38FAF5FD.jpg",
      "https://cdn.discordapp.com/attachments/961240264763133952/1149472894439661628/504BD178-B3FA-4B59-B237-8104628EF3B2.jpg",
      "https://cdn.discordapp.com/attachments/961240264763133952/1149473239286952006/C1433853-A1D6-4FA2-AA24-91D58574CCD3.jpg",
      "https://cdn.discordapp.com/attachments/961240264763133952/1149473605256761434/3DA82947-46E1-4F30-A0C2-B0A3BDE1C485.jpg",
      "https://cdn.discordapp.com/attachments/961240264763133952/1149473959599931512/78EF4A66-48F6-4D9C-9C75-81ABDEA8BB87.jpg",
      "https://cdn.discordapp.com/attachments/961240264763133952/1149474298218696896/BCC7DE40-F8C6-4859-ACC9-895B3936E262.jpg",
      "https://cdn.discordapp.com/attachments/961240264763133952/1149474656613576734/00124B7A-CAE9-419A-B8F0-103CA1DBB7EB.jpg",
      "https://cdn.discordapp.com/attachments/961240264763133952/1149475125255737394/1CC97288-6A75-4BF7-953A-9D72765E4CD5.jpg",
      "https://cdn.discordapp.com/attachments/961240264763133952/1149496008695369830/D6681E66-6F5B-405E-8EBE-35DF704266D2.jpg",
      "https://cdn.discordapp.com/attachments/961240264763133952/1149496028886736996/A56D826B-1A5D-4797-8EE4-086156AA390C.jpg",
      "https://cdn.discordapp.com/attachments/961240264763133952/1149496029234868364/6BC230DC-5FA7-4301-9A06-17E6BD3E9A7E.jpg",
      "https://cdn.discordapp.com/attachments/961240264763133952/1149496096570212424/1C5F8191-47EA-441B-A760-EA38B3C642CA.jpg",
      "https://cdn.discordapp.com/attachments/961240264763133952/1149496096989659187/06D9D299-AC0D-4894-92EB-3743CA0F7B1B.jpg",
      "https://cdn.discordapp.com/attachments/961240264763133952/1149496097274875974/C5EBABFC-A16E-461A-A8B3-E4C39E5B3FB6.jpg",
      "https://cdn.discordapp.com/attachments/961240264763133952/1149496097664942180/5195ADFF-1C70-4570-8CB7-5EDC07F3D1C9.jpg",
      "https://cdn.discordapp.com/attachments/961240264763133952/1149496098059210752/5508CDA3-5A5F-4948-9A52-958959D4F84D.jpg",
      "https://cdn.discordapp.com/attachments/961240264763133952/1149496098327642222/58A29241-A4B3-465E-BE1F-0784F38840EB.jpg",
      "https://cdn.discordapp.com/attachments/961240264763133952/1149496098864496710/D6A4D432-6326-45DF-B045-252883E4EA47.jpg",
    ];

    const a3 = [
      "ليبيا",
      "مصر",
      "الجزائر",
      "المغرب",
      "السودان",
      "فلسطين",
      "اثيوبيا",
      "امريكا",
      "الهند",
      "تركيا",
      "مورتانيا",
      "روسيا",
      "السعوديه",
      "الامارات",
      "الكويت",
      "الصين",
      "سوريا",
      "العراق",
      "افغانستان",
      "جنوب افريقيا",
      "البحرين",
    ];
  
    let a3l = Math.floor(Math.random() * a.length);
    const embed = new MessageEmbed()
      .setColor(`black`)
      .setImage(a[a3l])
      .setFooter("You Have 15 Seconds")
      .setTimestamp();
    message.channel.send({ embeds: [embed] });

    const filter = (m) => m.content.includes(a3[a3l]);
    message.channel
      .awaitMessages({
        filter,
        max: 1,
        time: 15000,
        errors: ["time"],
      })
      .then((collected) => {
        const winnerEmbed = new MessageEmbed()
          .setColor("50eb02")
          .setDescription(`✅ **| <@${collected.first().author.id}> Congratulations you are the winner!**`);
        message.channel.send({ embeds: [winnerEmbed] });
      })
      .catch(() => {
        const timeOverEmbed = new MessageEmbed()
          .setColor("fa0606")
          .setDescription(`🕘 **| Time is Over, No One Won.**`);
        message.channel.send({ embeds: [timeOverEmbed] });
      });
  }
});

///--------------------------------------------------------------///

client.on("messageCreate", async (message) => {
  if (
    message.content === prefix + "capitals" ||
    message.content === prefix + "عواصم"
  ) {
    const c = [
      "تونس",
      "سنغافورة",
      "الجزائر",
      "أمريكا",
      "الكويت",
      "البحرين",
      "الإمارات",
      "قطر",
      "ايطاليا",
      "السويد",
      "اليابان",
      "مصر",
      "ألمانيا",
      "فرنسا",
      "العراق",
      "الصين",
      "المغرب",
    ];
  
    const ca = [
      "تونس",
      "سنغافورة",
      "الجزائر",
      "واشنطن",
      "الكويت",
      "المنامة",
      "ابو ظبي",
      "الدوحة",
      "روما",
      "ستوكهولم",
      "طوكيو",
      "القاهرة",
      "برلين",
      "باريس",
      "بغداد",
      "بكين",
      "الرباط",
    ];
  
    let cap = Math.floor(Math.random() * c.length);
    const embed = new MessageEmbed()
      .setColor(`black`)
      .setDescription(`\`\`\`${c[cap]}\`\`\``)
      .setFooter("You Have 15 Seconds")
      .setTimestamp()
      .setAuthor(message.author.username, message.author.avatarURL());
  
    message.channel.send({ embeds: [embed] });
  
    const filter = (m) => m.content.includes(ca[cap]);
    message.channel
      .awaitMessages({
        filter,
        max: 1,
        time: 15000,
        errors: ["time"],
      })
      .then((collected) => {
        const winnerEmbed = new MessageEmbed()
          .setColor("50eb02")
          .setDescription(`✅ **| <@${collected.first().author.id}> Congratulations you are the winner!**`);
        message.channel.send({ embeds: [winnerEmbed] });
      })
      .catch(() => {
        const timeOverEmbed = new MessageEmbed()
          .setColor("fa0606")
          .setDescription(`🕘 **| Time is Over, No One Won.**`);
        message.channel.send({ embeds: [timeOverEmbed] });
      });
  }
});

///--------------------------------------------------------------///

client.on("messageCreate", async (message) => {
  if (
    message.content === prefix + "شعار" ||
    message.content === prefix + "شعارات" ||
    message.content === prefix + "brands"
  ) {
    const l = [
      "https://seeklogo.com/images/D/discord-icon-new-2021-logo-09772BF096-seeklogo.com.png", 
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png", 
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/WhatsApp_logo-color-vertical.svg/2048px-WhatsApp_logo-color-vertical.svg.png", 
      "https://wiki-signup.com/wp-content/uploads/2019/06/viber-image.jpg", 
      "https://www.reddiquette.com/wp-content/uploads/2020/09/What-Is-The-Reddit-Logo-Called.png", 
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Facebook_Messenger_logo_2020.svg/600px-Facebook_Messenger_logo_2020.svg.png", 
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/768px-Instagram_logo_2016.svg.png" ,
      "https://cdn.discordapp.com/attachments/1002518289475448855/1008646105518571621/unknown.png", 
      "https://cdn.discordapp.com/attachments/1002518289475448855/1008646546058919986/unknown.png", 
      "https://cdn.discordapp.com/attachments/1002518289475448855/1008646808907567264/unknown.png", 
      "https://cdn.discordapp.com/attachments/1002518289475448855/1008647264631267358/unknown.png", 
      "https://cdn.discordapp.com/attachments/1002518289475448855/1008647691984715776/unknown.png",
      "https://cdn.discordapp.com/attachments/1002518289475448855/1008648055236612146/unknown.png",
      "https://cdn.discordapp.com/attachments/1002518289475448855/1008648346417774632/unknown.png", 
      "https://cdn.discordapp.com/attachments/1002518289475448855/1008648634335768576/unknown.png", 
      "https://cdn.discordapp.com/attachments/1002518289475448855/1008648782499545108/unknown.png",
      "https://cdn.discordapp.com/attachments/1002518289475448855/1008648959729868870/unknown.png", 
      "https://cdn.discordapp.com/attachments/1002518289475448855/1008649276018151445/unknown.png", 
    ];
  
    const lo = [
      "ديسكورد", 
      "فيسبوك", 
      "واتساب", 
      "فايبر", 
      "ريدت", 
      "ماسنجر", 
      "انستا",
      "جوجل",
      "نايك", 
      "باي بال", 
      "سامسونج",
      "بوجاتي", 
      "مرسيدس",
      "فراري",
      "ماكدونالدز",
      "كنتاكي",
      "بيتزا هت",
      "هواوي",
    ];
  
    let log = Math.floor(Math.random() * l.length);
    const embed = new MessageEmbed()
      .setColor(`black`)
      .setDescription(`\`\`\`${l[log]}\`\`\``)
      .setFooter("You Have 15 Seconds")
      .setTimestamp()
      .setAuthor(message.author.username, message.author.avatarURL());
  
    message.channel.send({ embeds: [embed] });
  
    const filter = (m) => m.content.includes(lo[log]);
    message.channel
      .awaitMessages({
        filter,
        max: 1,
        time: 15000,
        errors: ["time"],
      })
      .then((collected) => {
        const winnerEmbed = new MessageEmbed()
          .setColor("50eb02")
          .setDescription(`✅ **| <@${collected.first().author.id}> Congratulations you are the winner!**`);
        message.channel.send({ embeds: [winnerEmbed] });
      })
      .catch(() => {
        const timeOverEmbed = new MessageEmbed()
          .setColor("fa0606")
          .setDescription(`🕘 **| Time is Over, No One Won.**`);
        message.channel.send({ embeds: [timeOverEmbed] });
      });
  }
});

///--------------------------------------------------------------///

client.on("messageCreate", async (message) => {
  if (
    message.content === prefix + "cut" ||
    message.content === prefix + "كت" ||
    message.content === prefix + "cutTweet"
  ) {
    const c = [
      "> **كم من الوقت تحتاج عشان تصحصح من بعد ما صحيت من النوم ؟**", 
      "> **كم من 10 البرود فيك ؟**", 
      "> **اكثر وقت تحب تنام فيه ؟**", 
      "> **من النوع الي تنام في طريق السفر ؟**", 
      "> **كم من 10 نسبة الكسل فيك هالايام ؟**", 
      "> **اسمك غريب ولا موجود منه كثير ؟**", 
      "> **اكثر شخص يتصل عليك بالواتس ؟**" ,
      "> ** منشن افضل صديق عندك**", 
      ">  **تحب الارتباط ب شخص أو لا؟ **", 
      "> **اي اكتر حاجه عايز تعملها و مش عارف؟ **", 
      "> **تحس انك مش مقبول؟ **", 
      "> **وش اكتر اكله تحبها؟ **", 
      "> **اكتر لون تحبه؟ **", 
      "> **شخص بدك تقوله بحبك ومتعرف؟ **", 
      "> **اكتر لعبه متحبها؟ **", 
      "> **اكتر لعبه تحبها؟ **", 
      "> **اكتر يوم تنام في؟ **", 
      "> **تقيمك لشخصيتك من ١٠؟**", 
      "> **مع و ضد: العتاب اكثر من مره دليل على ان الشخص ما يقدرك ...**", 
      "> **اعتذار تريد ان تقدمه لمن ؟**", 
      "> **وش جمع اسمك ؟**", 
      "> **تاريخ يعني لك الكثير ؟**", 
      "> **شيء تفكر تشتريه ...**", 
      "> **تفضل المواد الي تعتمد على الحفظ ولا الفهم ؟**", 
      "> **آخر اتصال كان من مين؟** ", 
      "> **مين اكتر شخص تحبه؟ **", 
      ">  **ايه الشىء اللى يكرهه صديقك؟** ", 
      "> ** تقدر ترسل آخر صورة بجوالك؟ ** ", 
      "> **اذا حسيت بغيرة تتكلم ولا لاء؟**", 
      "> **ايه اكتر شيء بيسحب تركيزك؟ **", 
      "> **عندك حبيبة أو لا؟** ", 
      "> ** تقدر تمنشن أكتر شخص تحبه؟** ", 
      "> **ايه شعورك تجاه أى شخص بيكرهك؟**", 
      "> ** بتحب والديك؟**", 
    ];
  
    let cut = Math.floor(Math.random() * c.length);
    const embed = new MessageEmbed()
      .setAuthor(message.author.username, message.author.avatarURL())
      .setDescription(c[cut])
      .setThumbnail("https://cdn.discordapp.com/attachments/1139379413914493008/1139384497914253432/8C35B030-3EEA-4EDA-BC4A-2E49D2F44FB0.jpg")
      .setColor(`black`)
      .setFooter("Verdi Tweet","https://cdn.discordapp.com/attachments/1139379413914493008/1139384497914253432/8C35B030-3EEA-4EDA-BC4A-2E49D2F44FB0.jpg");
  
    message.channel.send({ embeds: [embed] });
  }
});

///--------------------------------------------------------------///

client.on("messageCreate", async (message) => {
  if (
    message.content === prefix + "guess" ||
    message.content === prefix + "Guess"
  ) {
    const g = [
      "**هذا الشخص ممثل ومخرج مصري مشهور، ولد في القاهرة في أبريل 1971. بدأ مسيرته الفنية في التمثيل في عام 1993، وتميز بأدواره القوية والمؤثرة في الأعمال التلفزيونية والسينمائية. يعتبر من الفنانين المميزين وحصل على العديد من الجوائز. إلى جانب مسيرته الفنية، يشتهر أيضًا بنشاطه في الأعمال الإنسانية والخيرية.**",
      "**هذا الشخص المجهول هو ممثل مصري معروف، ولد في 17 مايو 1940 بالقاهرة، مصر. اشتهر بأدواره المتنوعة في مجال الفن، وحقق شهرة واسعة في العالم العربي بفضل تمثيله المميز في الأعمال الكوميدية والدرامية مثل رأفت الهجان ، بوحة وتفاحة ، النمس والكشاش.**",
      "هاذي الشخصيه هيا ممثل ومنتج مصري شهير. وُلد في 4 أغسطس 1960، وقد اشتهر بأدواره المميزة في الأفلام والمسلسلات التلفزيونية. من أعماله البارزة مسلسل 'الأسطورة' والذي قام فيه بدور الراعي الشهير 'الدنجوان'، وله العديد من الأعمال الأخرى الناجحة مثل 'الطوفان' و'كلبش' و'ولد الغلابة'. تميز بأدائه القوي والمؤثر، واستطاع كسب شعبية كبيرة في الوسط الفني وبين الجمهور.",
      "هاذي الشخصيه هيا رئيس مصر الثالث. قاد اتفاقيات كامب ديفيد مع إسرائيل في 1978، أدت لاستعادة سيناء وتحقيق السلام في 1979. أجرى إصلاحات اقتصادية وسياسية، وواجه تحديات داخلية. تعرض لمحاولة انقلاب واغتيال في 1981.",
      "هوا الشخص الذي قاد الجهود لتوحيد المملكة وإقامة نظام سياسي قوي في الجزيرة العربية. اعتبارًا من 1932، تم استخدام اسم المملكة العربية السعودية للإشارة إلى الدولة التي أسسها الملك عبد العزيز وأصبحت لاحقًا مملكة معروفة بشكل دولي.",
      "هاذي الشخصية وُلدت في 4 مايو 1898 وتوفيت في 3 فبراير 1975، كانت مطربة مصرية مشهورة باسم 'كوكب الشرق'. صوتها القوي وأداؤها المؤثر جعلها واحدة من أهم المغنيات في تاريخ الموسيقى العربية. أغانيها مازالت تحظى بشعبية واسعة حتى اليوم.",
      "هاذا الشخص هو الفنان المصري المعروف بأدواره الكوميدية والدرامية في الأفلام والمسلسلات. إلى جانب التمثيل، شارك في مسلسل 'الكبير'، وقدم أداءً مميزًا في الدور الذي قام به في المسلسل. مع أضافه حب الفنان الشديد للطيور و الحيوانات. وُلد في 18 أبريل 1989.",
      "هاذا الشخص هو اليوتيوبر الأمريكي جيمس دونالدسون، مشهور بتحدياته الغريبة ومشاريع الخيرية الكبيرة. وُلد في 7 مايو 1998 ويقدم محتوى مبتكر ومثير على يوتيوب.",
      "هاذا الشخص كان زعيمًا ألمانيًا تسبب في الحرب العالمية الثانية وأحداث مأساوية أخرى.",
    ];
    const gs = [
      "احمد السقا",
      "عادل امام",
      "امير كرارة",
      "انور السادات",
      "عبد العزيز آل سعود",
      "ام كلثوم",
      "روبي",
      "احمد مكي",
      "مستر بيست",
      "هتلر",
    ];

    let gsu = Math.floor(Math.random() * g.length);

    const embed = new MessageEmbed()
      .setColor('black')
      .setDescription(g[gsu])
      .setTitle("> **__The famous guess game__**")
      .setImage(
        "https://media.discordapp.net/attachments/1139379413914493008/1141990511121551370/F30C4EB3-8406-4442-8394-7AAF9D867419.jpg"
      )
      .setFooter("You Have 15 Seconds")
      .setTimestamp();
    message.channel.send({ embeds: [embed] });
    const filter = (m) => m.content.includes(gs[gsu]);
    message.channel
      .awaitMessages({
        filter,
        max: 1,
        time: 15000,
        errors: ["time"],
      })
      .then((collected) => {
        const embed = new MessageEmbed()
          .setColor("50eb02")
          .setDescription(`✅ **| <@${collected.first().author.id}> Congratulations you are winner**`);
        message.channel.send({ embeds: [embed] });
      })
      .catch(() => {
        const embed = new MessageEmbed()
          .setColor("fa0606")
          .setDescription(`🕘 **| Time is Over, No One Won.**`);
        message.channel.send({ embeds: [embed] });
      });
  }
});

///--------------------------------------------------------------///

client.on("messageCreate", async (message) => {
  if (
    message.content === prefix + "famous" ||
    message.content === prefix + "مشاهير"
  ) {
    const f = [
      "https://media.discordapp.net/attachments/1139379413914493008/1142015217392422964/IMG_7106.jpg",
      "https://media.discordapp.net/attachments/1139379413914493008/1142015372338417755/IMG_7107.jpg",
      "https://media.discordapp.net/attachments/1139379413914493008/1142015604023361537/IMG_7108.jpg",
      "https://media.discordapp.net/attachments/1139379413914493008/1142015700026785852/IMG_7109.jpg",
      "https://media.discordapp.net/attachments/1139379413914493008/1142015827227451453/IMG_7110.jpg",
      "https://media.discordapp.net/attachments/1139379413914493008/1142015952284823582/IMG_7111.jpg",
      "https://media.discordapp.net/attachments/1139379413914493008/1142016030953189427/IMG_7112.jpg",
      "https://media.discordapp.net/attachments/1139379413914493008/1142016242887180369/IMG_7113.jpg",
      "https://media.discordapp.net/attachments/1139379413914493008/1142016365738336356/IMG_7114.jpg",
      "https://media.discordapp.net/attachments/1139379413914493008/1142016468062572574/IMG_7115.jpg",
      "https://media.discordapp.net/attachments/1139379413914493008/1142016654746861619/IMG_7116.jpg",
      "https://media.discordapp.net/attachments/1139379413914493008/1142016751274569788/IMG_7117.jpg",
      "https://media.discordapp.net/attachments/1139379413914493008/1142016865565159566/IMG_7118.jpg",
    ];
    const fa = [
      "ابو فلة",
      "بندريتا",
      "اوسمز",
      "علي المرجاني",
      "نور ستارز",
      "احمد ابو الرب",
      "ابو هيكل",
      "باس ستوب",
      "عادل امام",
      "روبي",
      "احمد عز",
      "منة شلبي",
      "ويجز",
    ];

    let fam = Math.floor(Math.random() * f.length);

    const embed = new MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setColor("black")
      .setImage(f[fam])
      .setFooter("You Have 15 Seconds")
      .setTimestamp();
    message.channel.send({ embeds: [embed] });
    const filter = (m) => m.content.includes(fa[fam]);
    message.channel
      .awaitMessages({
        filter,
        max: 1,
        time: 15000,
        errors: ["time"],
      })
      .then((collected) => {
        const embed = new MessageEmbed()
          .setColor("50eb02")
          .setDescription(`✅ **| <@${collected.first().author.id}> Congratulations you are winner**`);
        message.channel.send({ embeds: [embed] });
      })
      .catch(() => {
        const embed = new MessageEmbed()
          .setColor("fa0606")
          .setDescription(`🕘 **| Time is Over, No One Won.**`);
        message.channel.send({ embeds: [embed] });
      });
  }
});

///--------------------------------------------------------------///

client.on("messageCreate", async (message) => {
  if (
    message.content === prefix + "puzzle" ||
    message.content === prefix + "لغز"
  ) {
    const p = [
      "شيء موجود في السماء إذا أضفت إليه حرفا أصبح في الأرض؟",
      "ما هو الشيء الذي يوصلك من بيتك إلى عملك دون أن يتحرك؟",
      "تاجر من التجار إذا اقتلعنا عينه طار. فمن هو؟",
      "ما هو الشيء الذي ترميه كلما احتجت إليه؟",
      "يسير بلا رجلين و لا يدخل إلا بالأذنين ما هو؟",
      "ما هو الشي الذي يكتب و لا يقر؟",
      "من هو الحيوان الذي يحك إذنه بأنفه؟",
      "ما هو الشي الذي كلما كثر لدينا غلا و كلما قل رخص؟",
      "ما هي التي تأكل و لا تشبع؟",
      "ما هو الشي الذي كلما أخذت منه يكبر ؟",
      "ما هو الشي الذي يوجد في وسط باريس؟",
      "ما هو البيت الذي ليس فيه أبواب و لا نوافذ؟",
      "أين يقع البحر الذي لا يوجد به ماء؟",
      "ماهو الشي الذي ينبض بلا قلب؟",
      "أخت خالك و ليست خالتك من تكون ؟",
    ];
    const pu = [
      "نجم",
      "الطريق",
      "عطار",
      "شبكة الصيد",
      "الصوت",
      "القلم",
      "الفيل",
      "العقل",
      "النار",
      "الحفرة",
      "راء",
      "بيت الشعر",
      "في الخريطة",
      "الساعه",
      "أمك",
    ];

    let puz = Math.floor(Math.random() * p.length);

    const embed = new MessageEmbed()
      .setAuthor(message.author.username, message.author.avatarURL())
      .setColor('black')
      .setDescription(`\`\`\`${p[puz]}\`\`\``)
      .setFooter("You Have 15 Seconds")
      .setTimestamp();
    message.channel.send({ embeds: [embed] });
    const filter = (m) => m.content.includes(pu[puz]);
    message.channel
      .awaitMessages({
        filter,
        max: 1,
        time: 15000,
        errors: ["time"],
      })
      .then((collected) => {
        const embed = new MessageEmbed()
          .setColor("50eb02")
          .setDescription(`✅ **| <@${collected.first().author.id}> Congratulations you are winner**`);
        message.channel.send({ embeds: [embed] });
      })
      .catch(() => {
        const embed = new MessageEmbed()
          .setColor("fa0606")
          .setDescription(`🕘 **| Time is Over, No One Won.**`);
        message.channel.send({ embeds: [embed] });
      });
  }
});

///--------------------------------------------------------------///

client.login(process.env.token); 