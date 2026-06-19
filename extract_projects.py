import re
import json

with open('script.js', 'r') as f:
    content = f.read()

# Let's extract the projectData array.
# Since it's valid JS, we can find the start of the array and grab the contents.
start_match = re.search(r'const projectData = \[', content)
if start_match:
    start_pos = start_match.start()
    # Find matching brace
    brace_count = 0
    end_pos = -1
    for i in range(start_pos, len(content)):
        if content[i] == '[':
            brace_count += 1
        elif content[i] == ']':
            brace_count -= 1
            if brace_count == 0:
                end_pos = i + 1
                break
    
    js_array = content[start_pos:end_pos]
    with open('extracted_projects.js', 'w') as out:
        out.write(js_array)
    print("Extracted projectData array.")
else:
    print("Could not find projectData array.")
