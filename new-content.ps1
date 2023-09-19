# Prompt user for post name, topic, and subtopics
$postName = Read-Host -Prompt 'Enter the name of the post'
$postTopic = Read-Host -Prompt 'Enter the topic of the post'
$subtopicsInput = Read-Host -Prompt 'Enter the subtopics separated by commas'
$subtopicsArray = $subtopicsInput -split '\s*,\s*'

# Date and Slug
$currentDate = Get-Date -Format "yyyy-MM-ddTHH:mm:ss-07:00"
$postSlug = $postName -replace '\s+', '-'

# Create the Markdown file
$postPath = ".\content\posts\$postSlug.html"

# Front matter
$frontMatter = @"
---
title: "$postName"
date: $currentDate
topic: "$postTopic"
summary: "This is a summary."
subtopic: ["$($subtopicsArray -join '", "')"]
draft: true
---
"@
# Write the front matter to the new post file
$frontMatter | Set-Content -Path $postPath

# Check and update topics.yaml
$topicsPath = ".\data\topics.yaml"

# Add main topic if not exists
$topicExists = Select-String -Path $topicsPath -Pattern "name: `"$postTopic`""
if (-not $topicExists) {
    $newTopic = @"
- name: "$postTopic"
  slug: "$(($postTopic -replace '\s+', '-').ToLower())"
  description: "Default Description"
  image: "/topics/$(($postTopic -replace '\s+', '-').ToLower()).jpg"
"@
    $newTopic | Add-Content -Path $topicsPath
    Write-Host "Added new topic to topics.yaml."
}

# Add subtopics if they do not exist
foreach ($subtopic in $subtopicsArray) {
    $subtopicExists = Select-String -Path $topicsPath -Pattern "name: `"$subtopic`""
    if (-not $subtopicExists) {
        $newSubTopic = @"
- name: "$subtopic"
  slug: "$(($subtopic -replace '\s+', '-').ToLower())"
  description: "Default Description"
  image: "/topics/$(($subtopic -replace '\s+', '-').ToLower()).jpg"
"@
        $newSubTopic | Add-Content -Path $topicsPath
        Write-Host "Added new subtopic $subtopic to topics.yaml."
    }
}

# Create the Markdown file
$postPath = ".\content\posts\$postSlug.md"

# Create folder for images in static directory
$imageFolderPath = ".\static\posts\$postSlug"
if (-not (Test-Path -Path $imageFolderPath)) {
    New-Item -ItemType Directory -Path $imageFolderPath
}

# Rest of the script remains unchanged


Write-Host "Post created successfully."
