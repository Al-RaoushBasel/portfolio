# PowerShell script to update project structures
$content = Get-Content "index.html" -Raw

# Define the projects and their details
$projects = @(
    @{name="Fake News Detector"; image="fake-news-detector/SS1.png"; title="Fake News Detector"},
    @{name="Sentiment Analysis"; image="sentiment-analysis-web-app/SS1.png"; title="Sentiment Analysis Web App"},
    @{name="Expense Analysis"; image="expense-analysis/SS1.png"; title="Expense Analysis Dashboard"},
    @{name="MyBudgetTracker"; image="budget-Tracker/SS1.png"; title="MyBudgetTracker"},
    @{name="Pipes in the Desert"; image="pipes-in-desert/SS1.png"; title="Pipes in the Desert"},
    @{name="Pong"; image="Pong/SS1.png"; title="Pong Game"},
    @{name="To-Do Website"; image="todo-website/SS1.png"; title="To-Do Website"}
)

foreach ($project in $projects) {
    $oldPattern = '<img\s+src="assets/images/' + $project.image + '"\s+alt="[^"]*"\s+class="project-thumbnail"\s*/>'
    $newStructure = '<div class="project-thumbnail-container">
      <img
        src="assets/images/' + $project.image + '"
        alt="' + $project.title + ' Screenshot"
        class="project-thumbnail"
      />
      <div class="project-thumbnail-overlay">
        <div class="project-overlay-title">' + $project.title + '</div>
      </div>
    </div>'
    
    $content = $content -replace $oldPattern, $newStructure
}

# Update project buttons
$content = $content -replace 'View on GitHub">', 'View on GitHub" class="btn btn-primary">'
$content = $content -replace 'View Project">', 'View Project" class="btn btn-primary">'
$content = $content -replace 'toggle-gallery-btn"', 'toggle-gallery-btn btn btn-tertiary"'

$content | Set-Content "index.html"
Write-Host "Project structures updated successfully!"
