import process from 'process';

export default function series(tasks, cb) {
  const results = [];
  let current = 0;
  let isSync = true;

  function done(err) {
    function end() {
      if (cb) cb(err, results);
    }
    if (isSync) process.nextTick(end);
    else end();
  }

  function each(err, result) {
    results.push(result);
    if (++current >= tasks.length || err) done(err);
    else tasks[current](each);
  }

  if (tasks.length > 0) tasks[0](each);
  else done(null);

  isSync = false;
}
