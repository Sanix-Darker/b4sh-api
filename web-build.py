from os import listdir as ls, remove, path
from jsmin import jsmin


COMPONENTS_PATH = "./app/static/js/components/"
UTILS_PATH = "./app/static/js/"

# We remove the precedent build.js
if path.exists(UTILS_PATH + "build.min.js"):
    remove(UTILS_PATH + "build.min.js")

# We compile all JS components and utils js
components = ls(COMPONENTS_PATH)
utils = ls(UTILS_PATH)
final_js_content = ""

for c in components:
    if ".js" in c:
        with open(COMPONENTS_PATH + c, "r") as fii:
            final_js_content += fii.read()

for c in utils:
    if ".js" in c:
        with open(UTILS_PATH + c, "r") as fii:
            final_js_content += fii.read()


# We write a new content
# and minify it
with open(UTILS_PATH + "build.js", "w") as fii:
    fii.write(jsmin(final_js_content))
# jsmin

# The replacement code
FROM_  = """
        <!-- Js Components -->
        <script src="../static/js/components/Header.js"></script>
        <script src="../static/js/components/Element.js"></script>
        <script src="../static/js/components/ListElements.js"></script>
        <script src="../static/js/components/Filters.js"></script>
        <script src="../static/js/components/Left.js"></script>
        <script src="../static/js/components/Right.js"></script>
        <script src="../static/js/components/ListTags.js"></script>
        <script src="../static/js/components/Editor.js"></script>
        <script src="../static/js/components/Command.js"></script>
        <script src="../static/js/components/About.js"></script>
        <script src="../static/js/components/App.js"></script>

        <!-- Imported Js libs -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

        <!-- Utils Js stuff -->
        <script src="../static/js/vars.js"></script>
        <script src="../static/js/ace-editor-utils.js"></script>
        <script src="../static/js/utils.js"></script>
        <script src="../static/js/index.js"></script>
"""

TO_ = """
        <!-- Imported Js libs -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

        <!-- Utils Js stuff and Js components-->
        <script src="../static/js/build.min.js"></script>
"""

# We re-write the index.html here
content = ""
with open("./app/templates/index.html", "r") as fii:
    content = fii.read().replace(FROM_, TO_)

with open("./app/templates/index.html", "w") as fii:
    fii.write(content)
