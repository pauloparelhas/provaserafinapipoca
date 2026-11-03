import sys
s = open(sys.argv[1], encoding='utf-8').read()
i = s.find("if ('serviceWorker' in navigator) {")
if i >= 0:
    j = s.index('</script>', i)
    s = s[:i] + "/* sem service worker neste ramo */\n" + s[j:]
open(sys.argv[2], 'w', encoding='utf-8').write(s)
