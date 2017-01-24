from docutils.core import publish_parts

def rst2html(rst):
    return publish_parts(rst, settings_overrides={"math_output":"MathJax"},
                         writer_name='html')['html_body']
