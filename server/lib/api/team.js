const teamURL =
  'https://api.overwatchleague.com/teams?' +
  'expand=team.content' +
  '&locale=en_GB';

async function team() {
  try {
    const res = await fetch(scheduleURL);
    const data = await res.json();
    return data.competitors;
  } catch (err) {
    return err
  }
}
