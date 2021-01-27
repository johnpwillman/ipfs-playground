const IPFS = require('ipfs-core')

async function main () {
  const node = await IPFS.create()
  const version = await node.version()
  console.log('Version:', version.version)

  const fileAdded = await node.add({
    path: 'hello.txt',
    content: 'Hello World 619'
  })
  console.log('Added file:', fileAdded.path, fileAdded.cid)
  // ...

  const publish = await node.name.publish(fileAdded.cid);
  console.log(publish);

  try {
    for await (const path of node.name.resolve(`/ipns/${publish.name}`)) {
      console.log(path);
    }
  } catch (err) {
    console.error(err)
  }

  const keys = await node.key.list();
  console.log(keys);
}

main()
