(() => {
  const recommendations = {
    transfer: {
      title: 'Daten an einer Stelle erfassen und weitergeben.',
      action: 'Nimm fünf typische Vorgänge und markiere die Felder, die dein Team mehrfach eintippt. Prüfe zuerst, ob sich diese Felder per Export oder Schnittstelle ins zweite System übernehmen lassen.',
      caseUrl: '/referenzen/sportweber-schnaittach',
    },
    bookings: {
      title: 'Anfragen in einem einheitlichen Ablauf bündeln.',
      action: 'Sammle die Angaben, die du bei den meisten Anfragen nachfragen musst. Erfasse sie gleich beim Eingang. Bei festen Terminen kannst du mit einem buchbaren Zeitfenster für eine Leistung beginnen.',
      caseUrl: '/referenzen/sportweber-bikeservice',
    },
    mobile: {
      title: 'Daten direkt vor Ort erfassen.',
      action: 'Nimm die häufigste Checkliste und reduziere sie auf die Angaben, die später wirklich gebraucht werden. Teste einen mobilen Prototyp mit einer Person im Außeneinsatz.',
      caseUrl: '/referenzen/fc-nuernberg',
    },
    approvals: {
      title: 'Zuständigkeiten und Status an einem Ort sichtbar machen.',
      action: 'Zeichne einen Durchlauf von der Anfrage bis zur Freigabe auf. Halte pro Schritt fest, wer entscheidet und was bei einer Rückfrage passiert. Beginne mit der Übergabe, bei der heute am meisten liegen bleibt.',
      caseUrl: '/referenzen/alfafood',
    },
  };

  const form = document.querySelector('#process-check');
  const result = document.querySelector('#check-result');
  const resultTitle = document.querySelector('#result-title');
  const weekOutput = document.querySelector('#result-week');
  const fourWeeksOutput = document.querySelector('#result-four-weeks');
  const recommendationOutput = document.querySelector('#result-recommendation');
  const actionOutput = document.querySelector('#result-action');
  const caseLink = document.querySelector('#result-case');
  const downloadButton = document.querySelector('#download-result');
  const formatNumber = new Intl.NumberFormat('de-DE');
  let summary = '';

  function formatDuration(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainder = minutes % 60;
    const parts = [];
    if (hours) parts.push(`${formatNumber.format(hours)} Std.`);
    if (remainder) parts.push(`${remainder} Min.`);
    return parts.join(' ');
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const process = form.elements.namedItem('process');
    const recommendation = recommendations[process.value];
    const count = form.elements.namedItem('count').valueAsNumber;
    const minutes = form.elements.namedItem('minutes').valueAsNumber;
    const weeklyMinutes = count * minutes;

    weekOutput.textContent = formatDuration(weeklyMinutes);
    fourWeeksOutput.textContent = formatDuration(weeklyMinutes * 4);
    recommendationOutput.textContent = recommendation.title;
    actionOutput.textContent = recommendation.action;
    caseLink.href = recommendation.caseUrl;
    summary = [
      'wesolve-IT · Quick-Check für manuelle Abläufe',
      '',
      `Aufgabe: ${process.selectedOptions[0].textContent}`,
      `Rechnung: ${formatNumber.format(count)} Vorgänge pro Woche × ${formatNumber.format(minutes)} Minuten`,
      `Geschätzter Aufwand: ${weekOutput.textContent} pro Woche und ${fourWeeksOutput.textContent} in vier Wochen.`,
      'Die Rechnung zeigt den heutigen Aufwand, keine prognostizierte Einsparung.',
      '',
      recommendation.title,
      recommendation.action,
      '',
      `Fallstudie: https://wesolve-it.com${recommendation.caseUrl}`,
    ].join('\n');

    window.posthog?.capture('quick_check_completed', {
      process_type: process.value,
    });
    window.posthog?.logger?.info('quick_check_completed', {
      process_type: process.value,
    });

    result.hidden = false;
    resultTitle.focus({ preventScroll: true });
    result.scrollIntoView({ block: 'start' });
    window.umami?.track?.('quick-check-ergebnis');
  });

  form.addEventListener('input', () => {
    result.hidden = true;
  });

  downloadButton.addEventListener('click', () => {
    window.posthog?.capture('quick_check_result_downloaded');
    window.posthog?.logger?.info('quick_check_result_downloaded');

    const file = new Blob([summary], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'wesolve-it-quick-check.txt';
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  });

  form.hidden = false;
})();
