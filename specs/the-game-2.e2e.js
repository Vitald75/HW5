
describe('The game', function () {
    it('should get more than 100 points ', async function () {
        await browser.url('https://viktor-silakov.github.io/course-sut/arkanoid.html');
        await browser.pause(1000);
        await $('button=PLAY').click();
        await browser.waitUntil(async () => {
        // player logic
        let delta = (await $('#ball').getLocation('x')) - (await $('#pad').getLocation('x')) - 60;
        if (delta > 0) {
              await browser.keys('D');
              if (delta > 20) {
                await browser.keys('D');}
          } else if (delta < 0) {
                   await browser.keys('A');
                   if (delta < -20) {
                     await browser.keys('A');
                    }
                 }
        const points = parseInt(await $('#points').getText(), 10);
        if (points > 100) return true
        console.log({ points });
      }, { timeout: 600000, interval: 10 })
    });
})
