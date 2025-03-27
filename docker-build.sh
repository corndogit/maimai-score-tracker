function build()
{
    version=$(cat package.json | grep -Po '"version": "\K(\d+\.\d+\.\d+(?:-\w+)?)')
    image_name="${2:-maimai-score-tracker:$version}"
    docker build -t "$image_name" .
    echo "$image_name"
}

function run()
{
    image_name=$(build "$@")
    docker run -p 5173:5173 "$image_name"
}

if [[ "$1" != "build" && "$1" != "run" ]]; then
    echo "Invalid command $1. Supported: build <image_name>, run <image_name>"
    exit 1
fi

"$1" "$@"
